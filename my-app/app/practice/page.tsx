"use client"
import React, { useState } from "react";
import AddEventModal from "../../components/modal";
import { format, getHours } from 'date-fns'
import { useGetEvents } from '../../apis/apiFunctions/events'
import Header from "../../components/header";
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
  const hoursArray = Array.from({ length: 24 }, (_, i) => i + 1);


  let [modal, setModal] = useState(false)
  let [targetDate, setTargetDate] = useState(null)

  const handleOpenModal = (date) => {
    setModal(!modal)
    setTargetDate(new Date(date))
  }

  let { isPending, isError, data, error } = useGetEvents()

  // let hoursStamp = [0, 15, 30, 45]
  let hoursStamp = ['00-14', '15-29', '30-44', '45-59']



  return (
    <div>
      {modal && <AddEventModal targetDate={targetDate} modal={modal} setModal={setModal} />}
      <Header date={currentDate} handleNextWeek={handleNextWeek} handlePreviousWeek={handlePreviousWeek} />
      <div className="flex justify-between mb-4">
      </div>
      <div className="border-black grid grid-cols-8 border">
        <div className="border-black p-2 font-bold border-r text-center"></div>
        {daysOfWeek.map((day, index) => {
          let convertDate = new Date(day)
          return (
            <div key={index} className="border-black text-center border-r">
              {format(convertDate, '	EEE, dd')}
            </div>
          )
        }
        )}
        {hoursArray.map((hour, hourIndex) => (
          <React.Fragment key={hourIndex}>
            <div className="flex items-center justify-center border-black p-2 border-t border-r text-right">{hour > 12 ? hour - 12 + 'pm' : hour + 'am'}</div>
            {daysOfWeek.map((day, dayIndex) => {
              return (
                <div onClick={() => handleOpenModal(new Date(day))} key={`${hourIndex}-${dayIndex}`} className={` border-gray-400 border-t border-r`}>
                  <div className="h-full">
                    {
                      hoursStamp.map((stamp, stampIndex) => {
                        let convertDay = new Date(day)
                        // console.log("convertDay: ", convertDay.toDateString())
                        let extractEvent = data?.filter((date) => {

                          let convertApiDate = new Date(date?.date)

                          let getStartHour = Number(date?.startTime.split(" ")[0].split(":")[0])
                          let getEndHour = Number(date?.endTime.split(' ')[0].split(':')[0])

                          let getStartMinutes = Number(date?.startTime.split(' ')[0].split(':')[1])
                          let getEndMinutes = Number(date?.endTime.split(' ')[0].split(':')[1])

                          let stampStart = Number(stamp.split('-')[0])
                          let stampEnd = Number(stamp.split('-')[1])

                          return (
                            (

                              convertDay.toDateString() === convertApiDate.toDateString()
                              &&
                              (hour >= getStartHour && hour <= getEndHour)
                              &&
                              stampStart >= getStartMinutes && stampEnd <= getEndMinutes
                              // ( getStartMinutes === getEndMinutes ?
                              //   stampStart >= getStartMinutes
                              //   :
                              //   stampStart >= getStartMinutes && stampEnd <= getEndMinutes
                              // )  
                            )
                          )
                        })

                        return (
                          <div key={stampIndex} className="h-12 border border-gray-200">
                            {
                              extractEvent?.map((event, eventIndex) => {
                                return (
                                  <div key={eventIndex} className="h-full">
                                    <div className={`h-full font-bold  pl-2 border-l-4 border-red-600 bg-red-200`}>
                                      {
                                        (
                                          (Number(event?.startTime.split(' ')[0].split(':')[0])
                                            === hour)
                                          &&
                                          (Number(event.startTime.split(' ')[0].split(':')[1]) === Number(stamp.split("-")[0]))
                                        )
                                        && 
                                        event?.eventName
                                      }
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div >
  );
};

export default WeeklyCalendar;
