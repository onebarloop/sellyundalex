'use client';

import { useActionState } from 'react';
import { login } from '@/src/actions/auth';

export default function LoginPage() {
  // state enthält den Rückgabewert der Server Action (z.B. Fehler-Nachrichten)
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <div>
      <form action={formAction}>
        <h2>Anmelden</h2>

        {state?.error && <p>{state.error}</p>}

        <input type="text" name="username" />

        <input type="password" name="password" placeholder="Passwort" />

        <button type="submit" disabled={isPending}>
          {isPending ? 'Wird geladen...' : 'Einloggen'}
        </button>
      </form>
    </div>
  );
}
