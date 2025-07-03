import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_session' })
export class UserSession {
	@PrimaryColumn({ type: 'varchar' })
	id!: string;

	@Column({ name: 'secret_hash', type: 'bytea', nullable: false })
	secretHash!: Uint8Array;

	@Column({ name: 'created_at', type: 'date', nullable: false })
	createdAt!: Date;

	public constructor(id: string, secretHash: Uint8Array, createdAt: Date) {
		this.id = id;
		this.secretHash = secretHash;
		this.createdAt = createdAt;
	}
	toString(): string {
		return `UserSession { id: ${this.id}, secret_hash: ${this.secretHash}, created_at: ${this.createdAt.toISOString()} }`;
	}
}
