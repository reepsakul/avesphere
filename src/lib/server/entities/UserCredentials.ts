import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_credentials' })
export class UserCredentials {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ name: 'username', type: 'text', nullable: false })
	username!: string;

	@Column({ name: 'password_hash', type: 'text', nullable: false })
	passwordHash!: string;
}
