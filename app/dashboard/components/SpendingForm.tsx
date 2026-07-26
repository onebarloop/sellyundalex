'use client';
import { add } from '@/src/actions/spendings';
import Input from '@/src/components/Input';
import { useState } from 'react';
import Button from '@/src/components/Button';
import { HandCoins, Send } from 'lucide-react';
import Popup from '@/src/components/Popup';

export default function SpendingForm() {
  const [show, setShow] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setShow(false);
    add(formData);
  };

  return (
    <Popup show={show} onShowChange={setShow} icon={<HandCoins size={32} />}>
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
        <Button
          className="border-3 py-3 rounded-xl self-end mt-8 w-full flex justify-center"
          type="submit"
        >
          <Send className="" size={46} />
        </Button>
      </form>
    </Popup>
  );
}
