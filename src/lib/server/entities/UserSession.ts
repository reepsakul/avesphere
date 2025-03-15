import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_session' })
export class UserSession {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'uuid', nullable: false })
	user_id!: string;

	@Column({ type: 'date', nullable: false })
	expires_at!: Date;
}
