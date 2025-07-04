import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_session' })
export class UserSession {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId!: string;

	@Column({ name: 'secret_hash', type: 'bytea', nullable: false })
	secretHash!: Buffer;

	@Column({ name: 'last_verified_at', type: 'timestamp', nullable: false })
  lastVerifiedAt!: Date;

	@Column({ name: 'created_at', type: 'timestamp', nullable: false })
	createdAt!: Date;

	public constructor(userId: string, secretHash: Buffer, lastVerifiedAt: Date, createdAt: Date) {
    this.userId = userId;
		this.secretHash = secretHash;
    this.lastVerifiedAt = lastVerifiedAt;
		this.createdAt = createdAt;
	}
	toString(): string {
		return `UserSession { id: ${this.id}, secret_hash: ${this.secretHash}, last_verified_at: ${this.lastVerifiedAt.toISOString()}, created_at: ${this.createdAt.toISOString()} }`;
	}
}
