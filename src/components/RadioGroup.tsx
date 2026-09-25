import { SpendingTypes } from '../db/schema';
import { getSpendingIcons } from '../lib/spendingIcons';

export default function RadioGroup({
  defaultValue,
}: {
  defaultValue?: SpendingTypes[number];
}) {
  const spendingTypes = getSpendingIcons(30);

  return (
    <div className="flex w-full overflow-hidden rounded-md bg-rose-100">
      {spendingTypes.map(({ spendingType, icon }, i) => (
        <div className="flex-1" key={spendingType}>
          <input
            defaultChecked={spendingType === defaultValue || i === 0}
            className="peer hidden"
            id={spendingType}
            value={spendingType}
            name="spending-type"
            type="radio"
          ></input>
          <label
            className="peer-checked:text-background flex justify-center p-2 peer-checked:bg-rose-500"
            htmlFor={spendingType}
          >
            {icon}
          </label>
        </div>
      ))}
    </div>
  );
}
