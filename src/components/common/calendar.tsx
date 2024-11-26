"use client"

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useMemo } from 'react';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Memoize calendar calculations to improve performance
  const calendarData = useMemo(() => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayIndex = firstDayOfMonth.getDay();

    const today = new Date();
    const isCurrentMonth =
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();

    // Ensure calendar always shows 6 weeks (42 cells)
    const totalCells = 42;
    const dates = [];

    // Previous month's dates
    for (let i = 0; i < startingDayIndex; i++) {
      dates.push({ date: null, isCurrentMonth: false });
    }

    // Current month's dates
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push({ 
        date: i, 
        isCurrentMonth: true,
        isToday: isCurrentMonth && i === today.getDate() 
      });
    }

    // Fill remaining cells
    while (dates.length < totalCells) {
      dates.push({ date: null, isCurrentMonth: false });
    }

    return dates;
  }, [currentDate]);

  const prevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="calendar-container w-full max-w-md mx-auto">
      {/* Header */}
      <div className="calendar-header flex justify-between items-center mb-4">
        <Button variant="outline" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="calendar-title font-bold text-lg">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <Button variant="outline" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Days of the Week */}
      <div className="calendar-days grid grid-cols-7 text-center font-bold mb-2">
        {DAYS.map((day) => (
          <div key={day} className="text-gray-500">{day}</div>
        ))}
      </div>

      {/* Calendar Dates */}
      <div className="calendar-dates grid grid-cols-7 text-center gap-1">
        {calendarData.map((cell, index) => (
          <div 
            key={index} 
            className={`
              date-cell 
              aspect-square 
              flex 
              items-center 
              justify-center 
              ${cell.isCurrentMonth ? 'text-black' : 'text-gray-300'}
              ${cell.isToday ? 'bg-blue-500 text-white rounded-full' : ''}
            `}
          >
            {cell.date}
          </div>
        ))}
      </div>
    </div>
  );
}