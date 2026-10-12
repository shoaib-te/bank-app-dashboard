"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { ChartProps } from "@/types/types";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ account = [] }: ChartProps) {
  const balances = account.length ? account.map((item) => item.balance) : [3400, 550, 2100];
  const labels = account.length ? account.map((item) => item.bankName) : ["Bank 1", "Bank 2", "Bank 3"];

  const data = {
    labels,
    datasets: [
      {
        label: "Bank",
        data: balances,
        backgroundColor: [
          "rgb(99, 135, 255)",
          "rgb(54, 162, 235)",
          "rgb(89, 86, 255)",
          "rgb(236, 72, 153)",
        ],
      },
    ],
  };

  return (
    <div className="h-28 w-28">
      <Doughnut
        data={data}
        options={{
          cutout: "60%",
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
        }}
      />
    </div>
  );
}

export default Chart;
