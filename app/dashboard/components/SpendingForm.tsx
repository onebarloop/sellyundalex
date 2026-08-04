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
          className="bg-rose-400 border-3 fixed bottom-6 right-6"
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
        className="flex flex-col gap-2 items-center"
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
          className="border-3 justify-between py-3 rounded-xl w-full self-end mt-8 bg-rose-400 text-foreground border-foreground flex text-3xl font-bold items-center"
          type="submit"
        >
          <span>Speichern</span>
          <SavePlus size={40} />
        </Button>
      </form>
    </Popup>
  );
}
