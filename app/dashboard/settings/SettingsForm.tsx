'use client';

import { setPassword } from '@/src/actions/user';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import {
  useActionState,
  startTransition,
  addTransitionType,
  useState,
} from 'react';

export default function SettingsForm() {
  const [state, formAction, isPending] = useActionState(setPassword, undefined);
  const [inputValue, setInputValue] = useState<null | string>(null);

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      addTransitionType('settings-update');
      formAction(formData);
      setInputValue(null);
    });
  };

  return (
    <form className="flex flex-col gap-2" action={handleSubmit}>
      <Input
        onChange={(e) => setInputValue(e.target.value)}
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
      <Button className="bg-rose-400" type="submit" disabled={!inputValue}>
        Passwort ändern
      </Button>
    </form>
  );
}
