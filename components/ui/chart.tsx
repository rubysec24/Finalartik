"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Basitleştirilmiş chart bileşeni
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
  }
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <div
      data-chart={chartId}
      ref={ref}
      className={cn(
        "flex aspect-video justify-center items-center text-xs",
        className
      )}
      {...props}
    >
      <div className="text-center">
        <p>Chart functionality has been simplified.</p>
        <p>Please configure recharts to use advanced charts.</p>
      </div>
    </div>
  )
})
ChartContainer.displayName = "Chart"

const Chart = {
  Container: ChartContainer,
}

export { Chart }
