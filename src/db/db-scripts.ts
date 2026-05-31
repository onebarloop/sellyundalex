import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import * as bcrypt from 'bcryptjs';
import { usersTable } from './schema'; // Passe den Pfad zu deinem Schema an

async function run() {
  const args = process.argv.slice(2);
  const shouldMigrate = args.includes('--migrate');
  const shouldSeed = args.includes('--seed');

  if (!shouldMigrate && !shouldSeed) {
    console.error('Use with flags');
    return;
  }

  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(pool);

  try {
    if (shouldMigrate) {
      await migrate(db, { migrationsFolder: './drizzle' });
      console.log('✅ Migrations success');
    }
    if (shouldSeed) {
      const passwordPlain = process.env.USER_PW;
      if (!passwordPlain) {
        console.warn('⚠️ USER_PW not found');
      } else {
        const hashedPassword = await bcrypt.hash(passwordPlain, 12);

        await db
          .insert(usersTable)
          .values({ name: 'Alex', passwordHash: hashedPassword })
          .onConflictDoNothing();
        await db
          .insert(usersTable)
          .values({ name: 'Selly', passwordHash: hashedPassword })
          .onConflictDoNothing();
        console.log('✅ Seeding success');
      }
    }
    // Führt die SQL-Dateien aus dem mitkopierten drizzle-Ordner aus
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();
