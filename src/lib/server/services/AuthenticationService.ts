import type { DataSource, Repository } from 'typeorm';
import { UserSession } from '../entities/UserSession';

function generateSecureRandomString(): string {
	// Human readable alphabet (a-z, 0-9 without l, o, 0, 1 to avoid confusion)
	const alphabet = 'abcdefghijklmnpqrstuvwxyz23456789';

	// Generate 24 bytes = 192 bits of entropy.
	// We're only going to use 5 bits per byte so the total entropy will be 192 * 5 / 8 = 120 bits
	const bytes = new Uint8Array(24);
	crypto.getRandomValues(bytes);

	let id = '';
	for (let i = 0; i < bytes.length; i++) {
		// >> 3 s"removes" the right-most 3 bits of the byte
		id += alphabet[bytes[i] >> 3];
	}
	return id;
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
	if (a.byteLength !== b.byteLength) {
		return false;
	}
	let c = 0;
	for (let i = 0; i < a.byteLength; i++) {
		c |= a[i] ^ b[i];
	}
	return c === 0;
}

export class AuthenticationService {
	private readonly sessionRepository: Repository<UserSession>;

	private readonly sessionExpiresInMs: number = 1000 * 60 * 60 * 24; // 1 day

	public constructor(private readonly db: DataSource) {
		this.sessionRepository = db.getRepository(UserSession);
	}

	public async createSession(): Promise<UserSessionWithToken> {
		const now = new Date();

		const id = generateSecureRandomString();
		const secret = generateSecureRandomString();
		const secretHash = await this.hashSecret(secret);

		const token = id + '.' + secret;

		const session = new UserSession(id, secretHash, now);

		const session_with_token: UserSessionWithToken = {
			id,
			secretHash,
			createdAt: now,
			token
		};

		const saved_session = await this.sessionRepository.save(session);
		console.info(`${saved_session} has been saved.`);

		return session_with_token;
	}

	public async validateSessionToken(token: string): Promise<UserSession | null> {
		const tokenParts = token.split('.');
		if (tokenParts.length != 2) {
			return null;
		}
		const sessionId = tokenParts[0];
		const sessionSecret = tokenParts[1];

		const session = await this.getSession(sessionId);

		if (session === null) {
			return null;
		}

		const tokenSecretHash = await this.hashSecret(sessionSecret);
		const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);

		if (!validSecret) {
			return null;
		}

		return session;
	}

	public async getSession(sessionId: string): Promise<UserSession | null> {
		const now = new Date();

		const foundSession: UserSession | null = await this.sessionRepository.findOneBy({
			id: sessionId
		});

		if (foundSession === null) {
			return null;
		}

		// Check expiration
		if (now.getTime() - foundSession.createdAt.getTime() >= this.sessionExpiresInMs) {
			await this.deleteSession(foundSession.id);
			return null;
		}

		return foundSession;
	}

	public async deleteSession(sessionId: string): Promise<void> {
		const foundSession: UserSession | null = await this.sessionRepository.findOneBy({
			id: sessionId
		});

		if (foundSession !== null) {
			await this.sessionRepository.remove(foundSession);
		}
	}

	async hashSecret(secret: string): Promise<Uint8Array> {
		const secretBytes = new TextEncoder().encode(secret);
		const secretHashBuffer = await crypto.subtle.digest('SHA-256', secretBytes);
		return new Uint8Array(secretHashBuffer);
	}
}

// Type Definitions
export class UserSessionWithToken extends UserSession {
	token: string;

	constructor(userSession: UserSession, token: string) {
		super(userSession.id, userSession.secretHash, userSession.createdAt);
		Object.assign(this, userSession);
		this.token = token; // NOTE: is not persisted in the database
	}
}
