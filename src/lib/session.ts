import 'server-only'; // Verhindert, dass dieser Code je im Browser landet
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { redirect } from 'next/navigation';

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET);

interface ExtendedPayload extends JWTPayload {
  username: string;
  userId: number;
}

export async function encrypt(payload: {
  userId: number;
  username: string;
  expiresAt: Date;
}) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET);
}

export async function decrypt(token: string | undefined = '') {
  try {
    const { payload } = await jwtVerify<ExtendedPayload>(token, SECRET, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Token-Prüfung fehlgeschlagen (abgelaufen oder manipuliert)');
    return null;
  }
}

export async function createSession(userId: number, username: string) {
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const token = await encrypt({ userId, username, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function verifySession() {
  const cookieStore = await cookies();

  const token = cookieStore.get('session_token')?.value;
  const session = await decrypt(token);

  // Wenn der Token ungültig oder nicht vorhanden ist -> Sofortiger Rauswurf
  if (!session?.userId) {
    redirect('/login');
  }

  return {
    isAuth: true,
    username: session.username,
    userId: session.userId,
  };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session_token');
}
