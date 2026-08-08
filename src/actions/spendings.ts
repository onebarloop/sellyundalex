'use server';

import { db } from '@/src/db/db';
import { spendings, type Spending } from '../db/schema';
import { verifySession } from '../lib/session';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { toCents } from '../lib/utils';
import { spendingTypeEnum } from '../db/schema';

export async function add(formData: FormData) {
  const { userId } = await verifySession();

  const spending = formData.get('spending');
  const amount = formData.get('amount');
  const spendingType = formData.get(
    'spending-type',
  ) as (typeof spendingTypeEnum.enumValues)[number];

  const fixed = toCents(amount);

  await db.insert(spendings).values({
    title: String(spending),
    amount: fixed,
    spenderId: userId,
    spendingType: spendingType,
  });

  revalidatePath('/');
}

export async function update(formData: FormData) {
  const { userId } = await verifySession();

  const spending = formData.get('spending');
  const amount = formData.get('amount');
  const spendingDate = String(formData.get('date'));
  const spendingId = Number(formData.get('spending-id'));
  const spendingType = formData.get(
    'spending-type',
  ) as (typeof spendingTypeEnum.enumValues)[number];

  const fixed = toCents(amount);

  await db
    .update(spendings)
    .set({
      title: String(spending),
      spendingDate: new Date(spendingDate),
      amount: fixed,
      spendingType,
    })
    .where(eq(spendings.id, spendingId));
  revalidatePath('/');
}

export async function remove(spending: Spending) {
  const { userId } = await verifySession();
  if (userId === spending.spenderId) {
    await db.delete(spendings).where(eq(spendings.id, spending.id));
  }
  revalidatePath('/');
}
