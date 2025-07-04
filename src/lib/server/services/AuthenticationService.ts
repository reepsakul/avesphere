import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import type { DataSource, Repository } from 'typeorm';
import { UserSession } from '../entities/UserSession';

export class AuthenticationService {
	private readonly sessionRepository: Repository<UserSession>;

  private readonly inactivityTimeoutMs = 1000 * 60 * 60 * 24 * 2; // 2 days
  private readonly activityCheckIntervalMs = 1000 * 60 * 60; // 1 hour

	public constructor(private readonly db: DataSource) {
		this.sessionRepository = db.getRepository(UserSession);
	}

	async hashSecret(secret: string): Promise<Buffer> {
		return createHash('sha256').update(secret).digest();
	}

  public async createSession(userId: string): Promise<UserSessionWithToken> {
      const now = new Date();

      const secret = randomBytes(32).toString('base64');
      const secretHash = await this.hashSecret(secret);

      const session = new UserSession(userId, secretHash, now, now);

      const saved_session = await this.sessionRepository.save(session);
      console.info(`${saved_session} has been saved.`);

      const token = saved_session.id + '.' + secret;

      return new UserSessionWithToken(saved_session, token);
  }

	public async validateSessionToken(token: string): Promise<UserSession | null> {
    const now = new Date();

		const tokenParts = token.split('.');
		if (tokenParts.length != 2) {
			return null;
		}
		const sessionId = tokenParts[0];
		const sessionSecret = tokenParts[1];

		const session = await this.getSession(sessionId);

		if (session === null) {
      console.warn(`Session with ID ${sessionId} not found.`);
			return null;
		}

		const tokenSecretHash = await this.hashSecret(sessionSecret);
		const validSecret = timingSafeEqual(tokenSecretHash, session.secretHash);

		if (!validSecret) {
      console.warn(`Invalid session secret for session ${sessionId}.`);
			return null;
		}

    if (now.getTime() - session.lastVerifiedAt.getTime() >= this.activityCheckIntervalMs) {
      session.lastVerifiedAt = now;
			const saved_session: UserSession | null = await this.sessionRepository.save(session);
			console.info(`Verification time of UserSession with ID ${sessionId} has been updated.`);
    }

		return session;
	}

	public async getSession(sessionId: string): Promise<UserSession | null> {
		const now = new Date();

		const session: UserSession | null = await this.sessionRepository.findOneBy({
			id: sessionId
		});

		if (session === null) {
      console.warn(`Session with ID ${sessionId} not found.`);
			return null;
		}

    // Inactivity timeout
    if (now.getTime() - session.lastVerifiedAt.getTime() >= this.inactivityTimeoutMs) {
      await this.invalidateSession(sessionId);
      console.info(`Session with ID ${sessionId} has been deleted due to inactivity.`);
      return null;
    }

		return session;
	}

	public async invalidateSession(sessionId: string): Promise<void> {
		const session: UserSession | null = await this.sessionRepository.findOneBy({
			id: sessionId
		});

		if (session !== null) {
      console.info(`Deleting session with ID ${sessionId}.`);
			await this.sessionRepository.remove(session);
		}
	}
  



}

// Type Definitions
export class UserSessionWithToken extends UserSession {
	token: string;

	constructor(userSession: UserSession, token: string) {
		super(
      userSession.userId,
			userSession.secretHash,
			userSession.lastVerifiedAt,
			userSession.createdAt
		);
		Object.assign(this, userSession);
		this.token = token; // NOTE: is not persisted in the database
	}
}
