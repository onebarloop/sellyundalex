import { getSpendingIcons } from '../lib/spendingIcons';

export default function RadioGroup({ iconSize = 30 }: { iconSize?: number }) {
  const spendingTypes = getSpendingIcons(iconSize);

  return (
    <div className="flex w-full  bg-rose-100 overflow-hidden rounded-md">
      {spendingTypes.map(({ spendingType, icon }, i) => (
        <div className="flex-1" key={spendingType}>
          <input
            defaultChecked={i === 0}
            className="hidden peer"
            id={spendingType}
            value={spendingType}
            name="spending-type"
            type="radio"
          ></input>
          <label
            className="peer-checked:text-background peer-checked:bg-rose-400 p-2 flex justify-center"
            htmlFor={spendingType}
          >
            {icon}
          </label>
        </div>
      ))}
    </div>
  );
}
