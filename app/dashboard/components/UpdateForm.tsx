import { update } from '@/src/actions/spendings';
import Popup from '@/src/components/Popup';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { CloudSync, Settings } from 'lucide-react';
import { useState } from 'react';
import RadioGroup from '@/src/components/RadioGroup';
import { SpendingWithSpender } from '@/src/db/queries';

type Props = {
  spending: SpendingWithSpender[number];
  userName: string;
};

export default function UpdateForm({ spending, userName }: Props) {
  const [showConfigDialog, setShowConfigDialog] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setShowConfigDialog(false);
    update(formData);
  };
  return (
    <Popup
      trigger={
        <Button
          className="border-none p-0!"
          onClick={() => setShowConfigDialog(true)}
          disabled={spending.spender?.name !== userName}
        >
          <Settings size={18} />
        </Button>
      }
      show={showConfigDialog}
      onClick={() => setShowConfigDialog(false)}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        action={handleSubmit}
        className="flex flex-col items-center gap-2"
      >
        <Input
          className="w-full p-3 text-2xl"
          placeholder="WAS?"
          id="spending"
          defaultValue={spending.title}
        />
        <Input
          className="w-full p-3 text-2xl"
          placeholder="WIEVIEL?"
          type="number"
          step="0.01"
          id="amount"
          defaultValue={String((spending.amount! / 100).toFixed(2))}
        />

        <Input
          className="block w-full p-3 text-2xl"
          type="date"
          id="date"
          name="date"
          defaultValue={new Date(spending.spendingDate)
            .toISOString()
            .slice(0, 10)}
        />
        <RadioGroup defaultValue={spending.spendingType ?? 'food'} />
        <input
          readOnly
          className="hidden"
          id="spending-id"
          name="spending-id"
          type="number"
          value={spending.id}
        />
        <Button
          className="text-foreground border-foreground mt-8 flex w-full items-center justify-between self-end rounded-md border-3 bg-rose-400 py-3 text-3xl font-bold"
          type="submit"
        >
          <span>Update</span>
          <CloudSync size={40} />
        </Button>
      </form>
    </Popup>
  );
}
