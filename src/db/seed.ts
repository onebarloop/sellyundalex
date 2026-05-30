import { db } from './db';
import { usersTable } from './schema';
import * as bcrypt from 'bcryptjs';

async function main() {
  const passwordPlain = process.env.USER_PW;

  if (!passwordPlain) {
    console.error('❌ USER_PW Umgebungsvariable fehlt!');
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(passwordPlain, 12);

  const user: typeof usersTable.$inferInsert = {
    name: 'Alex',
    passwordHash: hashedPassword,
  };

  const userSelly: typeof usersTable.$inferInsert = {
    name: 'Selly',
    passwordHash: hashedPassword,
  };

  // .onConflictDoNothing() verhindert Abstürze bei Container-Neustarts
  await db.insert(usersTable).values(user).onConflictDoNothing();
  await db.insert(usersTable).values(userSelly).onConflictDoNothing();

  console.log('🌱 Seeding abgeschlossen (oder Benutzer existierten bereits)!');
}

main().catch((err) => {
  console.error('❌ Seeding fehlgeschlagen:', err);
  process.exit(1);
});
