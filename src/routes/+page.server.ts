import TypeOrm from '$lib/server/db';
import { AuthenticationService } from '$lib/server/services/AuthenticationService';

var authService: AuthenticationService = new AuthenticationService(await TypeOrm.getDb());
authService.createSession();
