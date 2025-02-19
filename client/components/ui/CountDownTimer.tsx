"use client";
import Countdown from "react-countdown";
import { cn } from "@/lib/utils"

export default function CountDownTimer({className, date}: {className?: string, date: number}) {
  return (
      <Countdown date={date} className={cn("", className)}/>
  )
}
