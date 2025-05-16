"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Paracetamol", units: 1250 },
  { name: "Amoxicillin", units: 980 },
  { name: "Ibuprofen", units: 875 },
  { name: "Aspirin", units: 750 },
  { name: "Omeprazole", units: 620 },
]

export function BestSellingChart() {
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
        <Tooltip formatter={(value) => [`${value} units`, "Units Sold"]} labelFormatter={(label) => `Drug: ${label}`} />
        <Bar dataKey="units" name="Units Sold" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  )
}
