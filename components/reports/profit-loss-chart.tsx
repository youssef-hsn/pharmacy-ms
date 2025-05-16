"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", revenue: 12500, expenses: 8750, profit: 3750 },
  { month: "Feb", revenue: 15200, expenses: 9120, profit: 6080 },
  { month: "Mar", revenue: 11800, expenses: 9440, profit: 2360 },
  { month: "Apr", revenue: 10500, expenses: 11550, profit: -1050 },
  { month: "May", revenue: 14200, expenses: 9940, profit: 4260 },
]

export function ProfitLossChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, ""]} labelFormatter={(label) => `Month: ${label}`} />
        <Legend />
        <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" />
        <Bar dataKey="expenses" name="Expenses" fill="hsl(var(--destructive))" />
        <Bar dataKey="profit" name="Profit/Loss" fill="hsl(var(--success))" />
      </BarChart>
    </ResponsiveContainer>
  )
}
