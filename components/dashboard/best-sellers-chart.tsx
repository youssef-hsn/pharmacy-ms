"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Paracetamol", sales: 400 },
  { name: "Amoxicillin", sales: 300 },
  { name: "Ibuprofen", sales: 280 },
  { name: "Aspirin", sales: 200 },
  { name: "Omeprazole", sales: 180 },
  { name: "Metformin", sales: 150 },
  { name: "Atorvastatin", sales: 120 },
]

export function BestSellersChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 60,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
          <Tooltip formatter={(value) => [`${value} units`, "Sales"]} />
          <Bar dataKey="sales" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
