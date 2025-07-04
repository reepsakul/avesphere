import TypeOrm from '$lib/server/db';
import { AuthenticationService } from '$lib/server/services/AuthenticationService';
import { UserService } from '$lib/server/services/UserService';

var userService = new UserService(await TypeOrm.getDb());
var authService = new AuthenticationService(await TypeOrm.getDb());

const username = 'testuser';
const password = 'testpassword';

// Create a new user
await userService.createUser(username, password);

// Authenticate the user
const session = await userService.authenticateUser(username, password);

// wait for 5 seconds
await new Promise(resolve => setTimeout(resolve, 5000));

if (session != null) {
  authService.validateSessionToken(session.token)
  const sessionData = await authService.getSession(session.id);
  console.log(sessionData);
}


