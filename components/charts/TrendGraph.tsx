"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TrendGraphProps {
  data: Array<{
    month: string
    placements: number
  }>
}

export function TrendGraph({ data }: TrendGraphProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="placements" stroke="#4f46e5" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

