import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_session' })
export class UserSession {
  
  @PrimaryGeneratedColumn('uuid')
	id!: string;
  
	@Column({ name: 'user_id', type: 'uuid', nullable: false })
	userId!: string;
  
	@Column({ name: 'expires_at', type: 'date', nullable: false })
	expirationTime!: Date;
  
  public constructor(userId: string, expirationTime: Date) {
    this.userId = userId
    this.expirationTime = expirationTime
  }
	toString(): string {
		return `UserSession { id: ${this.id}, user_id: ${this.userId}, expires_at: ${this.expirationTime.toISOString()} }`;
	}
}
