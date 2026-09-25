'use client';
import { add } from '@/src/actions/spendings';
import Input from '@/src/components/Input';
import { useState } from 'react';
import Button from '@/src/components/Button';
import RadioGroup from '@/src/components/RadioGroup';
import { HandCoins, SavePlus } from 'lucide-react';
import Popup from '@/src/components/Popup';

export default function SpendingForm() {
  const [show, setShow] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setShow(false);
    add(formData);
  };

  return (
    <Popup
      trigger={
        <Button
          onClick={() => setShow(true)}
          className="fixed right-6 bottom-6 rounded-md border-3 bg-rose-400"
        >
          <HandCoins size={40} />
        </Button>
      }
      show={show}
      onClick={() => setShow(false)}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        action={handleSubmit}
        className="flex flex-col items-center gap-2"
      >
        <Input className="p-3 text-2xl" placeholder="WAS?" id="spending" />
        <Input
          className="p-3 text-2xl"
          placeholder="WIEVIEL?"
          type="number"
          step="0.01"
          id="amount"
        />
        <RadioGroup />
        <Button
          className="text-foreground border-foreground mt-8 flex w-full items-center justify-between self-end rounded-md border-3 bg-rose-400 py-3 text-3xl font-bold"
          type="submit"
        >
          <span>Speichern</span>
          <SavePlus size={40} />
        </Button>
      </form>
    </Popup>
  );
}
