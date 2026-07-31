'use client';

import { convertAmount } from '@/src/lib/convert';
import { motion, stagger } from 'motion/react';

export default function MonthlyExpenses({ amount }: { amount: number }) {
  const chars = convertAmount(amount).split('');
  console.log(chars);

  const container = {
    hidden: { x: -100 },
    show: {
      x: 0,
      transition: {
        delayChildren: stagger(0.1),
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <div className="aspect-square flex justify-center items-center text-6xl bg-rose-200 rounded-full">
      <motion.div variants={container} initial="hidden" animate="show">
        {chars.map((char, i) => (
          <motion.span className="last:ml-2" variants={item} key={i}>
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
