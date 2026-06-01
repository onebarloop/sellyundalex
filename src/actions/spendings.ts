'use server';

import { db } from '@/src/db/db';
import { spendings, type Spending } from '../db/schema';
import { verifySession } from '../lib/session';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function add() {
  const { userId } = await verifySession();

  const string = 'Test Ausgabe';

  await db.insert(spendings).values({
    title: string,
    amount: 12,
    spenderId: userId,
  });
  // revalidatePath('/');
}

export async function remove(spending: Spending) {
  const { userId } = await verifySession();
  if (userId === spending.spenderId) {
    await db.delete(spendings).where(eq(spendings.id, spending.id));
  }
  // revalidatePath('/');
}
