"use client"
import React, { useState } from "react";
import AddEventModal from "../../components/modal";
import { format, getHours } from 'date-fns'
import { useGetEvents } from '../../apis/apiFunctions/events'

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

  let { isPending, isError, data, error } = useGetEvents()

  let hoursStamp = ['00-15', '16-30', '31-45', '46-59']

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
        {hours.map((hour, hourIndex) => (
          <React.Fragment key={hourIndex}>
            <div className="flex items-center justify-center border-black p-2 border-t border-r text-right">{hour > 12 ? hour - 12 + 'pm' : hour + 'am'}</div>
            {daysOfWeek.map((day, dayIndex) => {
              let convertDay = new Date(day)
              let extractEvent = data?.find((date) => {
                let convertApiDate = new Date(date?.date)
                let getStartHour = Number(date?.startTime.split(':')[0])
                let getEndHour = Number(date?.endTime.split(':')[0])
                return (convertDay.toDateString() === convertApiDate.toDateString()
                  && (hour >= getStartHour && hour <= getEndHour)
                )
              })
              return (
                <div onClick={() => handleOpenModal(new Date(day))} key={`${hourIndex}-${dayIndex}`} className={`border-gray-400 border-t border-r`}>
                  <div className="h-full">
                    {
                      hoursStamp.map((stamp) => {
                        return (
                          // <div className="h-12 border-[1px] border-gray-400">
                          //   {/* {stamp} */}
                          // </div>

                           <div className="h-12 border-[1px] border-gray-400">
                            {
                              (
                                (Number(extractEvent?.startTime.split(':')[0]) >= hour
                                  ||
                                  Number(extractEvent?.endTime.split(':')[0]) <= hour
                                )
                                &&
                                (
                                  Number(extractEvent?.startTime.split(':')[1]) >= Number(stamp.split('-')[0])
                                  ||
                                  Number(extractEvent?.endTime.split(':')[1]) <= Number(stamp.split('-')[1])
                                )
                              )
                              && (
                                <div className="h-full">
                                  {
                                    (
                                      Number(extractEvent?.startTime.split(':')[1]) >= Number(stamp.split('-')[0])
                                      ||
                                      Number(extractEvent?.endTime.split(':')[1]) <= Number(stamp.split('-')[0])
                                    )
                                      ?
                                      <div className={`h-full font-bold ${Number(extractEvent?.startTime.split(':')[0]) === Number(extractEvent?.endTime.split(':')[0]) ? 'rounded-lg' : 'rounded-t-lg'}  pl-2 border-l-4 border-red-600 bg-red-300`}>
                                        {extractEvent?.eventName}
                                      </div>
                                      :
                                      (Number(extractEvent?.startTime.split(':')[1]) >= Number(stamp.split('-')[0])
                                        ||
                                        Number(extractEvent?.startTime.split(':')[1]) <= Number(stamp.split('-')[0])
                                      ) ?
                                        <div className={`h-full font-bold ${Number(extractEvent?.startTime.split(':')[0]) === Number(extractEvent?.endTime.split(':')[0]) ? 'rounded-lg' : 'rounded-t-lg'}  pl-2 border-l-4 border-red-600 bg-red-300`}>
                                        </div>
                                        :
                                        ""
                                  }
                                </div>
                              )
                            }
                          </div>
                        
                        )
                      })
                    }

                    {/* ---- Right code  */}
                    {/* {
                      Number(extractEvent?.startTime.split(':')[0]) === hour ?
                      <div className={`w-full h-full font-bold ${Number(extractEvent?.startTime.split(':')[0]) === Number(extractEvent?.endTime.split(':')[0]) ? 'rounded-lg' :'rounded-t-lg'}  pl-2 border-l-4 border-red-600 bg-red-300`}>
                      {extractEvent?.eventName}
                    </div>
                    :  ( hour >  Number(extractEvent?.startTime.split(':')[0]) || hour <  Number(extractEvent?.startTime.split(':')[0]) )  ?
                    <div className={`font-bold w-full h-full border-l-4 border-red-600 bg-red-300 ${ hour === Number(extractEvent?.endTime.split(':')[0]) && 'rounded-b-lg'} `}>
                    </div>
                    :
                    ""
                    } */}


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
