'use server';

import * as bcrypt from 'bcryptjs';
import { db } from '@/src/db/db';
import { redirect } from 'next/navigation';
import { deleteSession, createSession } from '../lib/session';

export async function login(
  prevState: { error: string } | undefined,
  formData: FormData,
) {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    // Validierung der Eingabefelder
    if (!username || !password) {
      return { error: 'Bitte alle Felder ausfüllen.' };
    }

    // 1. User aus Drizzle holen
    const user = await db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.name, username),
    });

    // 2. Credentials validieren (Aus Sicherheitsgründen gleiche Fehlermeldung)
    if (!user) {
      return { error: 'Ungültige Zugangsdaten.' };
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return { error: 'Ungültige Zugangsdaten.' };
    }

    await createSession(user.id, user.name);
  } catch (error) {
    console.error('Login-Fehler:', error);
    return { error: 'Interner Serverfehler.' };
  }

  // 5. Weiterleitung nach erfolgreichem Login (Muss außerhalb des try-catch stehen!)
  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
