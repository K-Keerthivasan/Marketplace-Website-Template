"use client"

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const chartColors = ["#312E81", "#F87171", "#FCD34D", "#6366F1"]

type DashboardChartProps = {
  data: Array<{ name: string; value: number }>
}

export function DashboardChart({ data }: DashboardChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
          <Tooltip cursor={{ fill: "rgba(49,46,129,0.08)" }} />
          <Bar dataKey="value" radius={[14, 14, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
