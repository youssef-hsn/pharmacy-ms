"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Paracetamol", turnover: 12.5, type: "Fast" },
  { name: "Amoxicillin", turnover: 10.2, type: "Fast" },
  { name: "Ibuprofen", turnover: 9.8, type: "Fast" },
  { name: "Metformin", turnover: 0.8, type: "Slow" },
  { name: "Atorvastatin", turnover: 1.2, type: "Slow" },
  { name: "Lisinopril", turnover: 1.5, type: "Slow" },
]

export function MoversChart() {
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value}`, "Turnover Rate"]} labelFormatter={(label) => `Drug: ${label}`} />
        <Legend />
        <Bar
          dataKey="turnover"
          name="Turnover Rate"
          fill="hsl(var(--primary))"
          fillOpacity={0.8}
          stroke="hsl(var(--primary))"
          strokeWidth={1}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
