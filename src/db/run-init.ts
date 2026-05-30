import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import * as bcrypt from 'bcryptjs';
import { usersTable } from './schema'; // Passe den Pfad zu deinem Schema an

async function run() {
  console.log('⏳ 1. Starte Datenbank-Migrationen...');

  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(pool);

  try {
    // Führt die SQL-Dateien aus dem mitkopierten drizzle-Ordner aus
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migrationen erfolgreich angewendet!');

    console.log('🌱 2. Starte Datenbank-Seeding...');
    const passwordPlain = process.env.USER_PW;
    if (!passwordPlain) {
      console.warn('⚠️ USER_PW Umgebungsvariable fehlt! Seeding übersprungen.');
    } else {
      const hashedPassword = await bcrypt.hash(passwordPlain, 12);

      // .onConflictDoNothing() fängt dein UNIQUE("name") ab, falls User schon existieren
      await db
        .insert(usersTable)
        .values({ name: 'Alex', passwordHash: hashedPassword })
        .onConflictDoNothing();
      await db
        .insert(usersTable)
        .values({ name: 'Selly', passwordHash: hashedPassword })
        .onConflictDoNothing();
      console.log('✅ Seeding erfolgreich abgeschlossen!');
    }
  } catch (error) {
    console.error('❌ Fehler während der DB-Initialisierung:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();
