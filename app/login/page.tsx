'use client';

import { useActionState } from 'react';
import { login } from '@/src/actions/auth';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <div className="pt-8">
      <form action={formAction}>
        <h1 className="mb-2 text-2xl font-bold">Anmelden</h1>

        <div className="flex flex-col gap-3 p-2">
          {state?.error && <p>{state.error}</p>}
          <Input className="p-2 text-lg" id="username" autocomplete="true" />
          <Input className="p-2 text-lg" id="password" type="password" />

          <Button
            className="text-foreground border-foreground flex items-center justify-between rounded border-3 bg-rose-400 text-lg font-bold"
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Wird geladen...' : 'Einloggen'}
          </Button>
        </div>
      </form>
    </div>
  );
}
