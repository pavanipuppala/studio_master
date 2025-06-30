"use client"

import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--chart-1))",
  },
  humidity: {
    label: "Humidity (%)",
    color: "hsl(var(--chart-3))",
  },
  light: {
    label: "Light (klx)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type ChartData = {
    day: string;
    temperature: number;
    humidity: number;
    light: number;
};

interface DataChartProps {
    data: ChartData[];
}

export function DataChart({ data }: DataChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Monthly Overview</CardTitle>
        <CardDescription>Key environmental metrics for the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
            <AreaChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    interval={4}
                />
                 <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    domain={['dataMin - 5', 'dataMax + 5']}
                 />
                <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <defs>
                    <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-temperature)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-temperature)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillHumidity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-humidity)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-humidity)" stopOpacity={0.1} />
                    </linearGradient>
                     <linearGradient id="fillLight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-light)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-light)" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <Area dataKey="temperature" type="natural" fill="url(#fillTemperature)" fillOpacity={0.4} stroke="var(--color-temperature)" strokeWidth={2} />
                <Area dataKey="humidity" type="natural" fill="url(#fillHumidity)" fillOpacity={0.4} stroke="var(--color-humidity)" strokeWidth={2} />
                <Area dataKey="light" type="natural" fill="url(#fillLight)" fillOpacity={0.4} stroke="var(--color-light)" strokeWidth={2} />
            </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
