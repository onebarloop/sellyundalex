'use client';

import { useActionState } from 'react';
import { login } from '@/src/actions/auth';
import Input from '@/src/components/Input';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <div>
      <form action={formAction}>
        <h1 className="text-2xl font-bold mb-2">Anmelden</h1>

        <div className="flex gap-2 flex-wrap">
          {state?.error && <p>{state.error}</p>}
          <Input id="username" />
          <Input id="password" type="password" />

          <button type="submit" disabled={isPending}>
            {isPending ? 'Wird geladen...' : 'Einloggen'}
          </button>
        </div>
      </form>
    </div>
  );
}
