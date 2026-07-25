'use client';
import { add } from '@/src/actions/spendings';
import Input from '@/src/components/Input';
import { useState } from 'react';
import Button from '@/src/components/Button';
import { CircleEuro, HandCoins, Send } from 'lucide-react';

export default function SpendingForm() {
  const [show, setShow] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setShow(false);
    add(formData);
  };

  if (show) {
    return (
      <div
        className="fixed bg-white/10 backdrop-blur-sm inset-0 p-8 flex  items-center justify-center"
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
          <Button
            className="border-3 py-3   rounded-xl self-end mt-8 w-full flex justify-center"
            type="submit"
          >
            <Send className="" size={46} />
          </Button>
        </form>
      </div>
    );
  }

  return (
    <Button
      className="bg-amber-900 fixed bottom-6 right-6"
      onClick={() => setShow(true)}
    >
      <HandCoins size={32} />
    </Button>
  );
}
