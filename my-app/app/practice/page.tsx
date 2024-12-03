"use client"
import React, { useState } from "react";
import dynamic from 'next/dynamic'
import AddEventModal from "../../components/modal";

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
  const hours = Array.from({ length: 24 }, (_, i) => i + 1);

  let [modal, setModal] = useState(false)
  let [targetDate, setTargetDate] = useState(null)

  console.log("target date: ", targetDate)
  console.log("daysOfWeek: ", daysOfWeek)

  const handleOpenModal = (date) => {
    setModal(!modal)
    setTargetDate(() => new Date(date))
  }

  return (
    <div>
      {modal && <AddEventModal targetDate={targetDate} modal={modal} setModal={setModal} />}
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

        {hours.map((hour, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="p-2 border-t border-r text-right">{hour}</div>

            {daysOfWeek.map((day, colIndex) => {
              let getSpecificDate = new Date(day)
              return (
              <div onClick={() => handleOpenModal(new Date(day))} key={`${rowIndex}-${colIndex}`} className="p-2 border-t border-r">
                <div className={` ${targetDate === getSpecificDate && 'bg-red-300' } w-full  p-4`}>
                  {/* <p>{targetDate.toLocaleDateString()}</p> */}
                  <p>o</p>
                </div>
                {/* {Array.from({ length: 4 }, (_, quarterIndex) => {
                  const minutes = quarterIndex * 15; // 0, 15, 30, 45
                  const cellDateTime = new Date(day);
                  cellDateTime.setHours(hour, minutes);
                  return (
                    <div
                      key={quarterIndex}
                      className="border-b border-gray-300 text-xs"
                    >
                      {cellDateTime.toLocaleString()} 
                    </div>
                  );
                })} */}
              </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
