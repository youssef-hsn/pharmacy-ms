"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "VAT Sales", value: 121540 },
  { name: "Non-VAT Sales", value: 44560 },
]

const COLORS = ["hsl(var(--primary))", "hsl(var(--muted))"]

export function VatChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, ""]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
