"use client"

import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export function CalendarWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="w-full max-w-md"> {/* Ensures same width as MessagesWidget */}
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-full"
      />
    </div>
  )
}
