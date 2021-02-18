import React, { useEffect } from 'react';
import Chart from 'chart.js';

import { colors } from '../../assets/ColorPalette';
import { Expense } from '../../Interfaces/Trip';

interface Expenses extends Array<Expense> {}

interface IProps {
  expenses: Expenses;
}

function PieChart({ expenses }: IProps) {
  const values: number[] = [];
  const types: string[] = [];

  expenses &&
    expenses.map((expense: any) => {
      types.push(expense.type);
      values.push(expense.amount);
    });

  useEffect(() => {
    let ctx = 'myChart';
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: types,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: 'rgb(255,255,255)',
          bodyFontColor: '#858796',
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false,
        },
        cutoutPercentage: 80,
      },
    });
  }, []);

  return <canvas id="myChart"></canvas>;
}

export default PieChart;
