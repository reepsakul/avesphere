import type { UUID } from 'crypto';
import type { DataSource, Repository } from 'typeorm';
import { UserSession } from './entities/UserSession';

export class AuthenticationService {
	private readonly sessionRepository: Repository<UserSession>;

	private readonly monthInMilliseconds: number = 1000 * 60 * 60 * 24 * 30;

	public constructor(private readonly db: DataSource) {
		this.sessionRepository = db.getRepository(UserSession);
	}

	public async createSession(userId: UUID): Promise<UserSession> {
		const session = new UserSession();
		session.user_id = userId;
		session.expires_at = new Date(Date.now() + this.monthInMilliseconds);

		const saved_session = await this.sessionRepository.save(session);
		console.info(
			`UserSession ${saved_session.id} with user ${saved_session.user_id} has been saved.`
		);
		return saved_session;
	}

	public async validateSession(sessionId: string): Promise<SessionValidationResult> {
		const foundSession = await this.sessionRepository.findOneBy({
			id: sessionId
		});

		if (foundSession === null) {
			return { session: null };
		}
		const session: Session = {
			id: foundSession.id,
			userId: foundSession.user_id,
			expiresAt: foundSession.expires_at
		};

		if (Date.now() >= session.expiresAt.getTime()) {
			await this.sessionRepository.remove(foundSession)
			return { session: null };
		}
		if (Date.now() >= session.expiresAt.getTime() - this.monthInMilliseconds / 2) {
			foundSession.expires_at = new Date(Date.now() + this.monthInMilliseconds);
      const saved_session = await this.sessionRepository.save(foundSession);
      console.info(
        `Expiration time of session ${saved_session.id} has been reset.`
      );
      return {session: saved_session};
		}
		return { session: foundSession };
	}

	public static async invalidateSession(sessionId: string): Promise<void> {
		// TODO: Remove a specific session from the database
	}

	public static async invalidateAllSessions(userId: number): Promise<void> {
		// TODO: Remove all sessions for a user
	}
}

// Type Definitions
export type SessionValidationResult =
	| { session: UserSession}
	| { session: null};

export interface Session {
	id: string;
	userId: string;
	expiresAt: Date;
}

export interface User {
	id: string;
}
