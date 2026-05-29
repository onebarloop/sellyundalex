'use server';

import * as bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { db } from '@/src/db/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { deleteSession } from '../lib/session';

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET);

// prevState wird für den React 'useActionState'-Hook im Frontend benötigt
export async function login(prevState: any, formData: FormData) {
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

    // 3. JWT Token generieren
    const token = await new SignJWT({ username: user.name, userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(SECRET);

    // 4. Cookie direkt über Next.js API setzen
    const cookieStore = await cookies();
    cookieStore.set('session_token', token, {
      httpOnly: true, // Schutz vor XSS / JS-Diebstahl
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
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
