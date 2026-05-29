import { db } from './db';
import { usersTable } from './schema';
import * as bcrypt from 'bcryptjs';

async function main() {
  const passwordPlain = 'mySecretPassword123';
  const hashedPassword = await bcrypt.hash(passwordPlain, 12);

  const user: typeof usersTable.$inferInsert = {
    name: 'Alex',
    passwordHash: hashedPassword,
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!');
}

main();
