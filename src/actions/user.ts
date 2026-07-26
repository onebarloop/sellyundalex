'use server';

import { db } from '../db/db';
import { users } from '../db/schema';
import { verifySession } from '../lib/session';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

export async function setPassword(
  prevState: { error: string } | { success: string } | undefined,
  formData: FormData,
) {
  const { userId } = await verifySession();

  const passwordPlain = String(formData.get('password'));
  const controlPassword = String(formData.get('confirm'));

  if (passwordPlain !== controlPassword) {
    return { error: 'Passwörter müssen übereinstimmen' };
  }

  const hashedPassword = await bcrypt.hash(passwordPlain, 12);

  await db
    .update(users)
    .set({ passwordHash: hashedPassword })
    .where(eq(users.id, userId));

  return { success: 'Passwort geändert' };
}
