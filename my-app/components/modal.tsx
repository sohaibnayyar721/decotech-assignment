"use client"
import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { format } from 'date-fns'
import { timeSlots } from "../lib/times";
import { usePostEvents } from '../apis/apiFunctions/events'
import { memo } from "react";
import { useState } from "react";
import Select from 'react-select';

function AddEventModal({ targetDate, modal, setModal }) {

    let { postEvent, data, isError, error, isPending, isSuccess } = usePostEvents()

    let [eventData, setEventData] = useState({
        date: new Date(targetDate),
        eventName: '',
        startTime: '',
        endTime: ''
    })

    const inputOnChange = (event) => {
        let { name, value } = event.target
        setEventData({ ...eventData, [name]: value })
    }

    const Save = () => {
        postEvent(eventData)
        setEventData({
            date: '',
            eventName: '',
            startTime: '',
            endTime: '',
        });
        setModal(!modal)
    }

    return (
        <div className="fixed flex items-center justify-center z-40 bg-gray-900  bg-opacity-50 w-full h-[100vh]">
            <div className="bg-white w-[35rem]  rounded-3xl">
                <div className="bg-[#F8F8F8] px-6 py-3 rounded-t-3xl flex justify-between">
                    <h1 className="font-semibold">Details</h1>
                    <CloseOutlinedIcon
                        className="cursor-pointer"
                        onClick={() => setModal(!modal)} />
                </div>
                <div className="flex items-center">
                    <div className="flex flex-col">
                        <div className="flex items-center  gap-6 px-6 mt-10 ">
                            <span className="font-semibold">Date: </span> {format(targetDate, 'EEEE, LLLL dd')}
                        </div>
                        <div className="flex items-center gap-6 px-6 mt-7 " >
                            <h1 className="font-semibold">Event Name</h1>
                            <input name='eventName' value={eventData.eventName} onChange={inputOnChange} className="w-40 h-9 border-[2px] border-[#D9D9D9] rounded-lg p-2 shadow-lg text-black font-semibold" ></input>
                        </div>
                        <div className="px-3 flex items-center gap-6  mt-10 ">
                            <div className="flex flex-col gap-2">
                                <h1 className="font-semibold">Start Time</h1>
                                {/* <Dropdown /> */}
                                <input name='startTime' value={eventData.startTime} onChange={inputOnChange} className="w-40 h-9 border-[2px] border-[#D9D9D9] rounded-lg p-2 shadow-lg text-black font-semibold" ></input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-semibold">End Time</h1>
                               
                                {/* <Dropdown /> */}
                                <input name='endTime' value={eventData.endTime} onChange={inputOnChange} className="w-40 h-9 border-[2px] border-[#D9D9D9] rounded-lg p-2 shadow-lg text-black font-semibold" ></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 justify-end p-4">
                    <button
                        className="text-black font-semibold border[#D9D9D9] border-[1px] rounded-full pl-6 pr-6 pt-2 pb-2 "
                        onClick={() => setModal(!modal)}
                    >
                        Cancel
                    </button>
                    <button disabled={isPending} onClick={Save} className=" bg-[#7B5AFF] rounded-full pl-6 pr-6 pt-2 pb-2 text-white">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(AddEventModal);