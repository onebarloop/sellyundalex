'use client';

import { toCurrency, toMonth } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { type TotalsAndUsersPerMonth } from '@/src/db/queries';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
      modules={[Pagination]}
      initialSlide={data.length}
      pagination={{
        el: '.swiper-pagination',
        bulletActiveClass: 'bg-rose-400! opacity-100!',
      }}
      // navigation={{
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      //   addIcons: false,
      //   disabledClass: 'opacity-40',
      // }}
    >
      {data.toReversed().map((month) => (
        <SwiperSlide className="w-full pb-12" key={month.month}>
          <Month month={month} />
        </SwiperSlide>
      ))}

      <div className="swiper-pagination"></div>

      {/* <div className="flex justify-between absolute z-100 bottom-0 w-full">
        <Button className="swiper-button-prev bg-mauve-300">
          <ArrowBigLeft className="fill-rose-300" />
        </Button>

        <Button className="swiper-button-next bg-mauve-300">
          <ArrowBigRight className="fill-rose-300" />
        </Button>
      </div> */}
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
    Chart.register(ChartDataLabels);
    const chart = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: month.users.map((u) => u.name),
        datasets: [
          {
            label: 'Betrag',
            data: month.users.map((u) => u.total),
            backgroundColor: month.users.map((u) =>
              u.name?.toLowerCase() === 'alex' ? alexColor : sellyColor,
            ),
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: false,
          },
          datalabels: {
            color: 'black',
            backgroundColor: 'white',
            font: {
              weight: 'bold',
            },
            formatter(value) {
              return toCurrency(value);
            },
            anchor: 'center',
            align: 'center',
            padding: 6,
            borderRadius: 6,
          },
        },
        cutout: '60%',
      },
      plugins: [
        {
          id: 'center-total',
          afterDraw(chart) {
            const { ctx, chartArea } = chart;
            if (!chartArea) return;

            const x = (chartArea.left + chartArea.right) / 2;
            const y = (chartArea.top + chartArea.bottom) / 2;

            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#111827';

            ctx.font = '600 14px sans-serif';
            ctx.fillText('Gesamt', x, y - 14);

            ctx.font = '700 24px sans-serif';
            ctx.fillText(toCurrency(month.total), x, y + 18);
            ctx.restore();
          },
        },
      ],
    });

    return () => chart.destroy();
  }, [month]);

  return (
    <div className="">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold mb-6"
      >
        Ausgaben im {toMonth(month.month)}
      </motion.h2>
      <div className="w-full aspect-square">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
