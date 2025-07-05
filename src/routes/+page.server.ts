import TypeOrm from '$lib/server/db';
import { AuthenticationService } from '$lib/server/services/AuthenticationService';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';

export function load(event: PageServerLoadEvent) {
	if (event.locals.session === null || event.locals.user === null) {
		redirect(302, '/login');
	}
	return {
		user: event.locals.user
	};
}

export const actions: Actions = {
	default: action
};

async function action(event: RequestEvent) {
	if (!event.locals.session) {
		return fail(401, {
			message: 'Not authenticated'
		});
	}
	const authService = new AuthenticationService(await TypeOrm.getDb());

	await authService.invalidateSession(event.locals.session.id);
	await authService.deleteSessionTokenCookie(event);
	redirect(302, '/login');
}
