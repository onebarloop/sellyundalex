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
        <h1 className="text-2xl font-bold mb-2">Anmelden</h1>

        <div className="flex flex-col gap-3 p-2">
          {state?.error && <p>{state.error}</p>}
          <Input className="text-lg p-2" id="username" autocomplete="true" />
          <Input className="text-lg p-2" id="password" type="password" />

          <Button
            className="border-3 justify-between rounded-lg bg-rose-400 text-foreground border-foreground flex text-lg  font-bold items-center"
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
