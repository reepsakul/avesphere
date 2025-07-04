import TypeOrm from '$lib/server/db';
import { AuthenticationService } from '$lib/server/services/AuthenticationService';

var authService: AuthenticationService = new AuthenticationService(await TypeOrm.getDb());
const session = await authService.createSession();

// wait for 5 seconds
await new Promise(resolve => setTimeout(resolve, 5000));
authService.validateSessionToken(session.token)
