import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';

async function runMigration() {
  console.log('⏳ Starte Datenbank-Migrationen...');

  // Nutzt deine DATABASE_URL Umgebungsvariable aus Docker
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  try {
    // Führt alle SQLs aus dem Kopierten Ordner aus
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migrationen erfolgreich angewendet!');
  } catch (error) {
    console.error('❌ Migration fehlgeschlagen:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
