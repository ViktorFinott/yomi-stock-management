"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface AnalyticsChartProps {
  title: string
  description?: string
  data: any[]
  type?: "line" | "bar"
  dataKeys: { key: string; color: string; name: string }[]
}

export function AnalyticsChart({ title, description, data, type = "line", dataKeys }: AnalyticsChartProps) {
  const ChartComponent = type === "line" ? LineChart : BarChart

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ChartComponent data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs" stroke="hsl(var(--muted-foreground))" />
            <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            {dataKeys.map((item) =>
              type === "line" ? (
                <Line
                  key={item.key}
                  type="monotone"
                  dataKey={item.key}
                  stroke={item.color}
                  strokeWidth={2}
                  name={item.name}
                />
              ) : (
                <Bar key={item.key} dataKey={item.key} fill={item.color} name={item.name} />
              ),
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
