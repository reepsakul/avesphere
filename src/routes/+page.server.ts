import { AuthenticationService } from "$lib/server/AuthenticationService";
import TypeOrm from "$lib/server/db";

var authService: AuthenticationService = new AuthenticationService(await TypeOrm.getDb());
authService.createSession();