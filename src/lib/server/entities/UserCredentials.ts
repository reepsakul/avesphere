import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_credentials' })
export class UserCredentials {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('text')
	email!: string;
}
