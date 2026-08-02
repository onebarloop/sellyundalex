'use client';

import { convertToMonth, convertAmount } from '@/src/lib/convert';
import { type TotalsAndUsersPerMonth } from '@/src/db/queries';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowBigRight, ArrowBigLeft } from 'lucide-react';
import Button from '@/src/components/Button';
import 'swiper/css';
import 'swiper/css/effect-cube';
import Chart from 'chart.js/auto';
import { useRef, useEffect } from 'react';

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
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const styles = getComputedStyle(document.documentElement);
    const sellyColor = styles.getPropertyValue('--color-selly');
    const alexColor = styles.getPropertyValue('--color-alex');
    const chart = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: month.users.map((u) => u.name),
        datasets: [
          {
            label: 'Betrag',
            data: month.users.map((u) => u.total),
            backgroundColor: [sellyColor, alexColor],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label(context) {
                return `${context.dataset.label}: ${convertAmount(context.parsed)}`;
              },
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [month]);

  return (
    <div className="text-end">
      <h2 className="font-bold mb-6">
        Ausgaben im {convertToMonth(month.month)}
      </h2>
      <div className="w-full aspect-square">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
