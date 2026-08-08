import { SpendingTypes } from '../db/schema';
import { getSpendingIcons } from '../lib/spendingIcons';

export default function RadioGroup({
  defaultValue,
}: {
  defaultValue?: SpendingTypes[number];
}) {
  const spendingTypes = getSpendingIcons(30);

  return (
    <div className="flex w-full  bg-rose-100 overflow-hidden rounded-md">
      {spendingTypes.map(({ spendingType, icon }, i) => (
        <div className="flex-1" key={spendingType}>
          <input
            defaultChecked={spendingType === defaultValue || i === 0}
            className="hidden peer"
            id={spendingType}
            value={spendingType}
            name="spending-type"
            type="radio"
          ></input>
          <label
            className="peer-checked:text-background peer-checked:bg-rose-500 p-2 flex justify-center"
            htmlFor={spendingType}
          >
            {icon}
          </label>
        </div>
      ))}
    </div>
  );
}
