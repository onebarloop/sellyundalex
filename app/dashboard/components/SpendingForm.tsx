import { add } from '@/src/actions/spendings';
import Input from '@/src/components/Input';

export default function SpendingForm() {
  return (
    <form action={add} className="flex gap-2 flex-wrap">
      <Input placeholder="name" id="spending" />
      <Input placeholder="amount" type="number" id="amount" />
      <button type="submit">Add</button>
    </form>
  );
}
