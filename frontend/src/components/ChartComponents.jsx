"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Bar, BarChart, LabelList, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function PieChartComponent({ ChartData, ChartConfig, ChartDataKey, ChartNameKey }) {
  return (
    <Card className="flex flex-col shadow-none h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top 5 Brands v/s Sales</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={ChartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={ChartData}
              dataKey={ChartDataKey}
              label nameKey={ChartNameKey}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

export function BarChartComponent({ ChartTitle, LeftMargin, TooltipWidth, ChartData, ChartConfig, XAxisDataKey, YAxisDataKey }) {
  return (
    <Card className="shadow-none h-full">
      <CardHeader>
        <CardTitle>{ChartTitle}</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={ChartConfig}>
          <BarChart
            accessibilityLayer
            data={ChartData}
            layout="vertical"
            margin={{
              left: LeftMargin,
            }}
          >
            <YAxis
              dataKey={YAxisDataKey}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                ChartConfig[value]?.label
              }
            />
            <XAxis dataKey={XAxisDataKey} type="number" hide />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  className={`!w-${TooltipWidth}`} // Add custom width here
                />
              }
            />

            <Bar dataKey={XAxisDataKey} layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function BarChartVerticalComponent({ ChartTitle, RightMargin, TooltipWidth, TooltipLabel, ChartData, ChartConfig, XAxisDataKey, YAxisDataKey }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ChartTitle}</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={ChartConfig}>
          <BarChart
            accessibilityLayer
            data={ChartData}
            layout="vertical"
            margin={{
              right: RightMargin,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey={YAxisDataKey}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey={XAxisDataKey} type="number" hide />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  // indicator="line"
                  hideIndicator
                  hideLabel
                  className={`!w-${TooltipWidth}`} 
                  formatter={(value, name) => {
                    if (name === XAxisDataKey) {
                      return (
                        <span>
                          {TooltipLabel} &nbsp; <strong>{value}</strong> 
                        </span>
                      )
                    }
                    return value
                  }}
                />
              }
            />
            <Bar
              dataKey={XAxisDataKey}
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey={YAxisDataKey}
                position="insideLeft"
                offset={8}
                className="fill-[#000000]"
                fontSize={13}
                formatter={(value) => value}
              />
              <LabelList
                dataKey={XAxisDataKey}
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}


export function TestAreaChartComponent({
  data,
  config,
  title,
  description,
  dateKey,
  valueKey,
}) {
  const [timeRange, setTimeRange] = React.useState("180d")

  const filterDataByRange = (data, timeRange) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let daysToSubtract = 180;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysToSubtract);

    return data.filter((item) => {
      const date = new Date(item[dateKey]);
      date.setHours(0, 0, 0, 0);
      return date >= startDate && date <= today;
    })
    .sort((a, b) => new Date(a[dateKey]) - new Date(b[dateKey]));
  }

  const filteredData = filterDataByRange(data, timeRange);

  return (
    <Card className="shadow-none">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
            <SelectValue placeholder="Last 6 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="180d" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={config} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6EE7B7" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dateKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  formatter={(value, name) => {
                    if (name === "total_sales_amount") {
                      return (
                        <span>
                          Total Sales Amount &nbsp; <strong>{value}</strong> 
                        </span>
                      )
                    }
                    return value
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey={valueKey}
              type="natural"
              fill="url(#fillArea)"
              stroke="var(--color-primary)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
