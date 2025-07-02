import type { UUID } from 'crypto';
import type { DataSource, Repository } from 'typeorm';
import { UserSession } from './entities/UserSession';

export class AuthenticationService {
	private readonly sessionRepository: Repository<UserSession>;

	private readonly sessionDurationMs: number = 1000 * 60 * 60 * 24 * 7;

	public constructor(private readonly db: DataSource) {
		this.sessionRepository = db.getRepository(UserSession);
	}

	public async createSession(userId: UUID): Promise<UserSession> {
		const session = new UserSession(userId, new Date(Date.now() + this.sessionDurationMs));

		const saved_session = await this.sessionRepository.save(session);
		console.info(`${saved_session} has been saved.`);
		return saved_session;
	}

	public async validateSession(sessionId: string): Promise<SessionValidationResult> {
		const foundSession: UserSession | null = await this.sessionRepository.findOneBy({
			id: sessionId
		});

		if (foundSession === null) {
			return { session: null };
		}

		if (Date.now() >= foundSession.expirationTime.getTime()) {
			await this.sessionRepository.remove(foundSession);

			return { session: null };
		}
		if (Date.now() >= foundSession.expirationTime.getTime() - this.sessionDurationMs / 2) {
			foundSession.expirationTime = new Date(Date.now() + this.sessionDurationMs);
			const saved_session: UserSession | null = await this.sessionRepository.save(foundSession);

			console.info(`Expiration time of UserSession ${saved_session} has been reset.`);

			return { session: saved_session };
		}
		return { session: foundSession };
	}

	public async invalidateSession(sessionId: string): Promise<void> {
		const foundSession: UserSession | null = await this.sessionRepository.findOneBy({
			id: sessionId
		});

		if (foundSession !== null) {
			await this.sessionRepository.remove(foundSession);
		}
	}
}

// Type Definitions
export type SessionValidationResult = { session: UserSession } | { session: null };
