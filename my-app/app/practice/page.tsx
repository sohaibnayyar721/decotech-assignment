"use client"
import React, { useState } from "react";
import dynamic from 'next/dynamic'

const WeeklyCalendar = () => {

  const [currentDate, setCurrentDate] = useState(new Date());

  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const getDaysOfWeek = (startOfWeek) => {
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const handlePreviousWeek = () => {
    const newDate = new Date(getStartOfWeek(currentDate));
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(getStartOfWeek(currentDate));
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const startOfWeek = getStartOfWeek(currentDate);
  const daysOfWeek = getDaysOfWeek(startOfWeek);
  const hours = Array.from({ length: 24 }, (_, i) => i + 1); // 0 to 23

  return (
    <div>
      {/* Week Navigation */}
      <div className="flex justify-between mb-4">
        <button onClick={handlePreviousWeek} className="p-2 bg-gray-200">
          Previous Week
        </button>
        <button onClick={handleNextWeek} className="p-2 bg-gray-200">
          Next Week
        </button>
      </div>

      <div className="grid grid-cols-8 border">

        <div className="p-2 font-bold border-r text-center">Time</div>
        {daysOfWeek.map((day, index) => (
          <div key={index} className="p-2 font-bold text-center border-r">
            {day.toDateString()}
          </div>
        ))}

        {/* Rows for Time Slots */}
        {hours.map((hour, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="p-2 border-t border-r text-right">{hour}:00</div>

            {/* Day Columns */}
            {daysOfWeek.map((day, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="p-2 border-t border-r">
                {/* 4 sections for each hour */}
                {Array.from({ length: 4 }, (_, quarterIndex) => {
                  const minutes = quarterIndex * 15; // 0, 15, 30, 45
                  const cellDateTime = new Date(day);
                  cellDateTime.setHours(hour, minutes);

                  return (
                    <div
                      key={quarterIndex}
                      className="border-b border-gray-300 text-xs"
                    >
                      {cellDateTime.toLocaleString()} {/* Display Date & Time */}
                    </div>
                  );
                })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
