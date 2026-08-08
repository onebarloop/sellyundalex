import { Cookie, HouseHeart, Balloon, Diamond } from 'lucide-react';
import { type SpendingTypes } from '../db/schema';
import { type ReactElement } from 'react';

export type SpendingTypeIcon = {
  spendingType: SpendingTypes[number];
  icon: ReactElement;
};

export function getSpendingIcon(
  spendingType?: SpendingTypes[number] | null,
  size = 30,
): ReactElement {
  switch (spendingType) {
    case 'food':
      return <Cookie size={size} />;
    case 'household':
      return <HouseHeart size={size} />;
    case 'fun':
      return <Balloon size={size} />;
    case 'misc':
      return <Diamond size={size} />;
    default:
      return <Diamond size={size} />;
  }
}

export function getSpendingIcons(size = 30): SpendingTypeIcon[] {
  return [
    {
      spendingType: 'food',
      icon: getSpendingIcon('food', size),
    },
    {
      spendingType: 'household',
      icon: getSpendingIcon('household', size),
    },
    {
      spendingType: 'fun',
      icon: getSpendingIcon('fun', size),
    },
    {
      spendingType: 'misc',
      icon: getSpendingIcon('misc', size),
    },
  ];
}
