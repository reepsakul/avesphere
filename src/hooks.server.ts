import 'reflect-metadata';
import TypeOrm from '$lib/server/db';
import dotenv from 'dotenv';

dotenv.config({ path: 'db.env' });

async function initializeDatabase() {
  console.log('Starting database setup...');
  await TypeOrm.getDb();
}

initializeDatabase().catch((error) => console.error('Error initializing DB:', error));
