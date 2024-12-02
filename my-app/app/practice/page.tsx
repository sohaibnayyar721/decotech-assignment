"use client"
import React, { useState } from 'react';
import Button from '../../components/button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Header from '../../components/header';

const Calendar = () => {

  // #################
  let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

  let [currentMonth, setCurrentMonth] = useState(new Date())

  const getMonth = currentMonth.toLocaleDateString('en-US', {
    day:'2-digit'
  })

  console.log(getMonth)
  const getYear = currentMonth.getFullYear()

  const handlePrevMonth = () => {
    let newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentMonth(newDate)
  }

  const handleNextMonth = () => {
    let newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentMonth(newDate)
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date();
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);
  endOfMonth.setHours(23, 59, 59, 999);


  function FormatDate(date) {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'alphabet',
      day: '2-digit',
    });
    return formattedDate
  }

  function GetDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const intervals = [15, 30, 45, 59];
  const hours = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className="px-3">

      <Header month={getMonth} year={getYear} handleNextMonth={handleNextMonth} handlePrevMonth={handlePrevMonth} />

      {days.map((day, idx) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), idx + 1);
        return (
          <div key={idx} className="flex flex-col font-bold text-center border p-2">
            {day} {date.getDate()}
          </div>
        );
      })}
      <div className='mt-4 grid grid-cols-8 grid-rows-24 items-center justify-center  border-2 border-gray-400'>

        {hours.map((hour, rowIdx) => (
          <>
            <div key={rowIdx} className="text-center">
              {hour > 12 ? hour - 12 + ' ' + 'PM' : hour + ' ' + 'AM'}
            </div>
            {days.map((day, colIdx) => (
              <div
                key={`${rowIdx}-${colIdx}`}
                className="grid grid-rows-4 gap-0.5 border"
              >
                {intervals.map((interval, idx) => (
                  <div key={`${rowIdx}-${colIdx}-${idx}`} className="border-b-[1px] border-gray-300 p-4 text-center">
                    {(hour === currentMonth.getDay() && day === getMonth ) && (
                      <>
                        <p>{currentMonth.getDay()}</p>
                        <p>{currentMonth.getMinutes()}</p>
                      </>
                    )}

                  </div>
                ))}
              </div>
            ))}
          </>
        ))}
      </div>
    </div >
  );
};

export default Calendar;
