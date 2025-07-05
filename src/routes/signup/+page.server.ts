import TypeOrm from '$lib/server/db';
import { AuthenticationService } from '$lib/server/services/AuthenticationService';
import { UserService } from '$lib/server/services/UserService';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';

const db = await TypeOrm.getDb();
const authService = new AuthenticationService(db);
const userService = new UserService(db);

export function load(event: PageServerLoadEvent) {
	if (event.locals.session !== null && event.locals.user !== null) {
		redirect(302, '/');
	}
	return {
		user: event.locals.user ? { ...event.locals.user } : null,
		session: event.locals.session ? { ...event.locals.session } : null
	};
}

export const actions: Actions = {
	default: action
};

async function action(event: RequestEvent) {
	const formData = await event.request.formData();
	const username = formData.get('username');
	const password = formData.get('password');

	if (typeof username !== 'string' || typeof password !== 'string') {
		return fail(400, {
			message: 'Invalid or missing fields',
			username: ''
		});
	}

	if (password === '' || username === '') {
		return fail(400, {
			message: 'Please enter your username, email, and password',
			email: '',
			username: ''
		});
	}

	if (!userService.verifyUsernameInput(username)) {
		return fail(400, {
			message: 'Invalid username',
			username
		});
	}
	const strongPassword = await userService.verifyPasswordStrength(password);
	if (!strongPassword) {
		return fail(400, {
			message: 'Weak password',
			username
		});
	}

	const user = await userService.createUser(username, password);

	const session = await authService.createSession(user.id);
	authService.setSessionTokenCookie(event, session.token);

	redirect(302, '/login');
}
