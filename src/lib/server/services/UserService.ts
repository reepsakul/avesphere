import argon2 from 'argon2';
import type { DataSource, Repository } from 'typeorm';
import { UserCredentials } from '../entities/UserCredentials';
import { AuthenticationService, UserSessionWithToken } from './AuthenticationService';


export class UserService {
	private readonly userRepository: Repository<UserCredentials>;

	public constructor(private readonly db: DataSource) {
		this.userRepository = db.getRepository(UserCredentials);
	}

	public async createUser(username: string, password: string): Promise<UserCredentials> {
		const newUser = new UserCredentials();
		newUser.username = username;
		newUser.passwordHash = await this.hashPassword(password);

      const saved_user = await this.userRepository.save(newUser);
      console.info(`User with ${saved_user} has been saved.`);

		return newUser;
	}

	async hashPassword(password: string): Promise<string> {
		return await argon2.hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			parallelism: 1
		});
	}

	async verifyPasswordHash(hash: string, password: string): Promise<boolean> {
		return await argon2.verify(hash, password);
	}

	async verifyPasswordStrength(password: string): Promise<boolean> {
		if (password.length < 8 || password.length > 255) {
			return false;
		}
		return true;
	}

  public async getUserByUsername(username: string): Promise<UserCredentials | null> {
    const user = await this.userRepository.findOneBy({ username: username });
    if (user === null) {
      console.warn(`User with username ${username} not found.`);
      return null;
    }
    return user;
  }

  public async getUserById(userId: string): Promise<UserCredentials | null> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user === null) {
      console.warn(`User with ID ${userId} not found.`);
      return null;
    }
    return user;
  }

  public async changePassword(username: string, newPassword: string): Promise<UserCredentials | null> {
    const user = await this.getUserByUsername(username);
    if (user === null) {
      console.warn(`User with username ${username} not found.`);
      return null;
    }

    user.passwordHash = await this.hashPassword(newPassword);
    const updatedUser = await this.userRepository.save(user);
    console.info(`Password for user ${username} has been updated.`);
    
    return updatedUser;
  }

  public async deleteUser(username: string): Promise<void> {
    const user = await this.getUserByUsername(username);
    if (user === null) {
      console.warn(`User with username ${username} not found.`);
      return;
    }

    await this.userRepository.remove(user);
    console.info(`User with username ${username} has been deleted.`);
  }

  public async authenticateUser(username: string, password: string): Promise<UserSessionWithToken | null> {
    const user = await this.getUserByUsername(username);
    if (user === null) {
      console.warn(`Authentication failed: User with username ${username} not found.`);
      return null;
    }

    const isPasswordValid = await this.verifyPasswordHash(user.passwordHash, password);
    if (!isPasswordValid) {
      console.warn(`Authentication failed: Invalid password for user ${username}.`);
      return null;
    }

    const authService = new AuthenticationService(this.db);

    const sessionWithToken = await authService.createSession(user.id);
    console.info(`User ${username} authenticated successfully.`);

    return sessionWithToken
  }
}
