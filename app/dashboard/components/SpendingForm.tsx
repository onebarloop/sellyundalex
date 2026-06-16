import { add } from '@/src/actions/spendings';

export default function SpendingForm() {
  return (
    <form action={add} className="flex gap-2">
      <input
        placeholder="Name"
        type="text"
        id="spending"
        name="spending"
        className="bg-amber-100 text-black"
      />
      <input
        placeholder="Betrag"
        type="number"
        id="amount"
        name="amount"
        className="bg-amber-100 text-black"
      />
      <button className="">Add</button>
    </form>
  );
}
