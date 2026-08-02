'use client';

import { convertAmount, convertToMonth } from '@/src/lib/convert';
import { motion, stagger } from 'motion/react';
import { type TotalsAndUsersPerMonth } from '@/src/db/queries';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowBigRight, ArrowBigLeft } from 'lucide-react';
import Button from '@/src/components/Button';
import 'swiper/css';
import 'swiper/css/effect-cube';

export default function MonthlyExpenses({
  data,
}: {
  data: TotalsAndUsersPerMonth;
}) {
  return (
    <Swiper
      className="w-full h-full"
      slidesPerView={1}
      spaceBetween={50}
      dir={'rtl'}
      modules={[Navigation]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        addIcons: false,
        disabledClass: 'opacity-40',
      }}
    >
      {data.map((month) => (
        <SwiperSlide className="w-full" key={month.month}>
          <Month month={month} />
        </SwiperSlide>
      ))}

      <div className="flex justify-between">
        <Button className="swiper-button-prev bg-mauve-300">
          <ArrowBigRight className="fill-rose-300" />
        </Button>

        <Button className="swiper-button-next bg-mauve-300">
          <ArrowBigLeft className="fill-rose-300" />
        </Button>
      </div>
    </Swiper>
  );
}

function Month({ month }: { month: TotalsAndUsersPerMonth[number] }) {
  const chars = convertAmount(month.total).split('');

  const container = {
    hidden: {},
    show: {
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
    <div className="text-end">
      <h2 className="font-bold mb-6">
        Ausgaben im {convertToMonth(month.month)}
      </h2>
      <div className="aspect-square border-foreground border-3 flex justify-center items-center text-6xl bg-rose-200 rounded-full">
        <motion.div variants={container} initial="hidden" animate="show">
          {chars.map((char, i) => (
            <motion.span className="last:ml-2" variants={item} key={i}>
              {char}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
