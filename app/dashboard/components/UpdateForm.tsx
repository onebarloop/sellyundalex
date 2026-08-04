import { update } from '@/src/actions/spendings';
import { SpendingWithSpender } from './Spendings';
import Popup from '@/src/components/Popup';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { CloudSync, Settings } from 'lucide-react';
import { useState } from 'react';

type Props = {
  spending: SpendingWithSpender;
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
    >
      <form
        onClick={(e) => e.stopPropagation()}
        action={handleSubmit}
        className="flex flex-col gap-2 items-center"
      >
        <Input
          className="p-3 text-2xl w-full"
          placeholder="WAS?"
          id="spending"
          defaultValue={spending.title}
        />
        <Input
          className="p-3 text-2xl w-full"
          placeholder="WIEVIEL?"
          type="number"
          step="0.01"
          id="amount"
          defaultValue={String((spending.amount! / 100).toFixed(2))}
        />

        <Input
          className="p-3 text-2xl w-full"
          type="date"
          id="date"
          name="date"
          defaultValue={new Date(spending.spendingDate)
            .toISOString()
            .slice(0, 10)}
        />
        <input
          readOnly
          className="hidden"
          id="spending-id"
          name="spending-id"
          type="number"
          value={spending.id}
        />
        <Button
          className="border-3 justify-between py-3 rounded-xl w-full self-end mt-8 bg-rose-400 text-foreground border-foreground flex text-3xl font-bold items-center"
          type="submit"
        >
          <span>Update</span>
          <CloudSync size={40} />
        </Button>
      </form>
    </Popup>
  );
}
