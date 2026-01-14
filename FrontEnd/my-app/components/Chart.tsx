/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { useGetExpensesQuery, useGetIncomesQuery } from '@/store/query/Auth-query';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Chart = () => {
  const { data: expensesData } = useGetExpensesQuery();
  const { data: incomesData } = useGetIncomesQuery();

  // Group expenses by month and calculate totals
  const expensesByMonth = expensesData?.reduce((acc: Record<string, number>, expense: any) => {
    const month = new Date(expense.date).toLocaleString('en-US', { month: 'long' });
    acc[month] = (acc[month] || 0) + Number(expense.amount);
    return acc;
  }, {}) || {};

  // Group income by month and calculate totals
  const incomeByMonth = incomesData?.reduce((acc: Record<string, number>, income: any) => {
    const month = new Date(income.date).toLocaleString('en-US', { month: 'long' });
    acc[month] = (acc[month] || 0) + Number(income.amount);
    return acc;
  }, {}) || {};

  // Get unique months from both datasets
  const allMonths = Array.from(new Set([...Object.keys(expensesByMonth), ...Object.keys(incomeByMonth)]));

  const data = {
    labels: allMonths,
    datasets: [
      {
        label: 'Income',
        data: allMonths.map(month => incomeByMonth[month] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      },
      {
        label: 'Expenses',
        data: allMonths.map(month => expensesByMonth[month] || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      }
    ]
  };
  return (
    <div className="h-full">
      <Bar data={data} options={{ plugins: { legend: { display: true } }, maintainAspectRatio: false }} />
    </div>
  )
}

export default Chart