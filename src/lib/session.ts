import 'server-only'; // Verhindert, dass dieser Code je im Browser landet
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET);
}

export async function decrypt(token: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      algorithms: ['HS256'],
    });
    return payload; // Gibt die User-Daten zurück, wenn die Signatur stimmt
  } catch (error) {
    console.log('Token-Prüfung fehlgeschlagen (abgelaufen oder manipuliert)');
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const token = await encrypt({ userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

// 2. Die zentrale Prüf-Funktion (Data Access Layer / DAL)
export async function verifySession() {
  const cookieStore = await cookies();

  const token = cookieStore.get('session_token')?.value;
  const session = await decrypt(token);

  // Wenn der Token ungültig oder nicht vorhanden ist -> Sofortiger Rauswurf
  if (!session?.userId) {
    redirect('/login');
  }

  return { isAuth: true, username: session.username, userId: session.userId };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session_token');
}
