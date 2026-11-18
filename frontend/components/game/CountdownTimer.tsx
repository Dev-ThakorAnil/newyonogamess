"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer({ 
  targetDate, 
  className = "",
  size = "md" 
}: { 
  targetDate: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const [isMounted, setIsMounted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsFinished(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) return null;

  if (!targetDate) {
    return (
      <div className={`font-bold text-blue-500 uppercase tracking-wider text-xs ${className}`}>
        Coming Soon
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className={`font-bold text-green-cta animate-pulse ${className}`}>
        Available Now!
      </div>
    );
  }

  const sizes = {
    sm: { container: "gap-1 text-[10px]", block: "w-8 h-8 rounded-md", label: "text-[8px]" },
    md: { container: "gap-2 text-sm", block: "w-12 h-12 rounded-lg", label: "text-[10px]" },
    lg: { container: "gap-3 text-lg md:text-xl", block: "w-16 h-16 md:w-20 md:h-20 rounded-xl", label: "text-xs font-bold" },
  };

  const currentSize = sizes[size];

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className={`bg-slate-100 border border-slate-200 shadow-inner flex items-center justify-center font-bold font-mono text-slate-800 ${currentSize.block}`}>
        {value.toString().padStart(2, '0')}
      </div>
      <span className={`text-muted-foreground uppercase tracking-widest mt-1 ${currentSize.label}`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className={`flex items-center justify-center ${currentSize.container} ${className}`}>
      <TimeBlock value={timeLeft.days} label="Days" />
      <span className="font-bold pb-4 text-muted-foreground">:</span>
      <TimeBlock value={timeLeft.hours} label="Hrs" />
      <span className="font-bold pb-4 text-muted-foreground">:</span>
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <span className="font-bold pb-4 text-muted-foreground">:</span>
      <TimeBlock value={timeLeft.seconds} label="Sec" />
    </div>
  );
}
