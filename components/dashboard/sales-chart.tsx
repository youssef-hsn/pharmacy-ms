"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (29 - i))

  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    sales: Math.floor(Math.random() * 1000) + 500,
  }
})

export function SalesChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(value) => value.split(" ")[1]} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value) => [`$${value}`, "Sales"]} labelFormatter={(label) => `Date: ${label}`} />
          <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
