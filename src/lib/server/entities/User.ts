import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserCredentials {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('text')
	email!: string;
}
