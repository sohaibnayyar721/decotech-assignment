"use client"
import React, { useState } from "react";
import AddEventModal from "../../components/modal";
import { format, getHours } from 'date-fns'

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

  const handleOpenModal = (date) => {
    setModal(!modal)
    setTargetDate(new Date(date))
  }

  let givenDate = [
    { name: 'Sohaib', date: 'Mon Dec 02 2024 11:58:50 GMT+0500 (Pakistan Standard Time)' },
    { name: 'Sohaib', date: 'Mon Dec 02 2024 11:58:50 GMT+0500 (Pakistan Standard Time)' },
    { name: 'Asad', date: 'Mon Dec 03 2024 11:58:50 GMT+0500 (Pakistan Standard Time)' },
    { name: 'Tehseen', date: 'Mon Dec 04 2024 11:58:50 GMT+0500 (Pakistan Standard Time)' }
  ]

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

        <div className="p-2 font-bold border-r text-center"></div>
        {daysOfWeek.map((day, index) => {
          let convertDate = new Date(day)
          return (
            <div key={index} className="text-center border-r">
              {format(convertDate, '	EEE, dd')}
            </div>
          )
        }
        )}

        {hours.map((hour, hourIndex) => (

          <React.Fragment key={hourIndex}>
            <div className="p-2 border-t border-r text-right">{hour}</div>

            {daysOfWeek.map((day, dayIndex) => {
              let convertDay = new Date(day)

              let extractEvent = givenDate.find((date) => {
                let extractDate = new Date(date.date)
                return (convertDay.toLocaleDateString() === extractDate.toLocaleDateString() &&
                  hour === getHours(extractDate)
                )
              })

              console.log(extractEvent)

              return (
                <div onClick={() => handleOpenModal(new Date(day))} key={`${hourIndex}-${dayIndex}`} className=" border-t border-r">
                  <div className="p-2">
                    {
                      (extractEvent && extractEvent.name) && (
                        <p className=" font-bold rounded pl-2 border-l-4 border-red-600 bg-red-300">{extractEvent && extractEvent.name}</p>
                      )
                    }
                  </div>
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
