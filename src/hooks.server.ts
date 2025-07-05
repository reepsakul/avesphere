import TypeOrm from '$lib/server/db';
import { AuthenticationService } from '$lib/server/services/AuthenticationService';
import type { Handle } from '@sveltejs/kit';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config({ path: 'db.env' });

async function initializeDatabase() {
	console.log('Starting database setup...');
	await TypeOrm.getDb();
}

initializeDatabase().catch((error) => console.error('Error initializing DB:', error));

// Authentication handle
export const handle: Handle = async ({ event, resolve }) => {
	const authService = new AuthenticationService(await TypeOrm.getDb());

	const token = event.cookies.get('session') ?? null;
	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		console.log('No session cookie: setting user and session to null');
		return await resolve(event);
	}

	const { session, user } = await authService.validateSessionToken(token);
	if (session !== null) {
		authService.setSessionTokenCookie(event, token);
	} else {
		authService.deleteSessionTokenCookie(event);
	}

	const plainUser = user ? JSON.parse(JSON.stringify(user)) : null;
	const plainSession = session ? JSON.parse(JSON.stringify(session)) : null;

	event.locals.session = plainSession;
	event.locals.user = plainUser;

	console.log('After validation:', { session, user });
	return await resolve(event);
};
