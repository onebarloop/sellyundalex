import { Cookie, HouseHeart, Balloon, Diamond } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';

export default function RadioGroup() {
  const spendingTypes = [
    {
      spendingType: 'food',
      icon: <Cookie />,
    },
    {
      spendingType: 'flat',
      icon: <HouseHeart />,
    },
  ];

  return (
    <div className="flex gap-4 w-full bg-rose-100 p-3 rounded-md">
      {spendingTypes.map(({ spendingType, icon }, i) => (
        <div key={spendingType}>
          <input
            defaultChecked={i === 0}
            className="hidden peer"
            id={spendingType}
            value={spendingType}
            name="spending-type"
            type="radio"
          ></input>
          <label className="peer-checked:text-rose-500" htmlFor={spendingType}>
            {icon}
          </label>
        </div>
      ))}
    </div>
  );
}
