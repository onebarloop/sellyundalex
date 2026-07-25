'use server';

import { db } from '@/src/db/db';
import { spendings, type Spending } from '../db/schema';
import { verifySession } from '../lib/session';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function add(formData: FormData) {
  const { userId } = await verifySession();

  const spending = formData.get('spending');
  const amount = formData.get('amount');

  const fixed = Number(amount).toFixed(2) * 100;

  await db.insert(spendings).values({
    title: String(spending),
    amount: fixed,
    spenderId: userId,
  });
  revalidatePath('/');
}

export async function remove(spending: Spending) {
  const { userId } = await verifySession();
  if (userId === spending.spenderId) {
    await db.delete(spendings).where(eq(spendings.id, spending.id));
  }
  revalidatePath('/');
}
