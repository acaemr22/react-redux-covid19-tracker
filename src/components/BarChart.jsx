import { Bar } from "react-chartjs-2";
import React from "react";
import { Chart as Chartjs } from "chart.js/auto";

const BarChart = ({ chartData }) => {
  return (
    <Bar
      data={chartData}
      options={{
        plugins: {
          legend: {
            display: true,
            labels: {
                boxHeight: "0",
            }
          },
        },
      }}
    />
  );
};

export default BarChart;
