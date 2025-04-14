"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// DayPicker type'ını manuel olarak tanımlayalım
interface DayPickerProps {
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
  [key: string]: any
}

export type CalendarProps = DayPickerProps 

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className={cn("p-3", className)}>
      <div className="text-center">
        <p>Calendar functionality simplified due to dependency issues.</p>
        <p>Please check back later.</p>
      </div>
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
