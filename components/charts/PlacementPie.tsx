"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface PlacementPieProps {
  data: Array<{
    name: string
    value: number
  }>
}

export function PlacementPie({ data }: PlacementPieProps) {
  const COLORS = ["#4f46e5", "#e5e7eb"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} students`, ""]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

