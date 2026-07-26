'use client';

import { setPassword } from '@/src/actions/user';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { useActionState } from 'react';
export default function SettingsForm() {
  const [state, formAction, isPending] = useActionState(setPassword, undefined);
  return (
    <form className="flex flex-col gap-2" action={formAction}>
      <Input
        id="password"
        type="password"
        name="password"
        placeholder="Neues Passwort"
      />
      <Input
        id="confirm"
        type="password"
        name="confirm"
        placeholder="Passwort bestätigen"
      />
      {state?.error}
      {state?.success}
      <Button type="submit">Submit</Button>
    </form>
  );
}
