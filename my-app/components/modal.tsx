"use client"
import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Dropdown from "./dropDown";
import { useState } from "react";
import BASE_URL from "../Base_URL";

function AddEventModal({ targetDate, modal, setModal }) {

    let [data, setData] = useState('')
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState('')

    const postEventsDetails = async(data) => {
        setLoading(true)
        try{
            let response = await fetch(`${BASE_URL}/event`, {
                method: "POST",
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }) 
            if(!response.ok){
                throw new Error('Unexpected Error Occurr')
            }
            setLoading(false)
        }catch(err){
            setLoading(false)
        }
    }

    return (
        <div className="fixed flex items-center justify-center z-40 bg-gray-900  bg-opacity-50 w-full h-[100vh]">
            <div className="bg-white w-[35rem]  rounded-3xl">
                <div className="bg-[#F8F8F8] px-6 py-3 rounded-t-3xl flex justify-between">
                    <h1 className="font-semibold">Details</h1>
                    <CloseOutlinedIcon
                        className="cursor-pointer"
                        onClick={() => setModal(!modal)}
                    />
                </div>
                <div className="flex items-center">
                    <div className="flex flex-col">

                        <div className="flex items-center  gap-6 px-6 mt-10 ">
                            <span className="font-semibold">Date: </span> {targetDate.toLocaleString('en-US')}
                        </div>

                        <div className="flex items-center gap-6 px-6 mt-7 " >
                            <h1 className="font-semibold">Event Name</h1>
                            <input className="w-40 h-9 border-[2px] border-[#D9D9D9] rounded-lg p-2 shadow-lg text-black font-semibold" ></input>
                        </div>

                        <div className="px-3 flex items-center gap-6  mt-10 ">
                            <div className="flex flex-col gap-2">
                                <h1 className="font-semibold">Start Time</h1>
                                <Dropdown />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h1 className="font-semibold">End Time</h1>
                                <Dropdown />
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
                    <button className=" bg-[#7B5AFF] rounded-full pl-6 pr-6 pt-2 pb-2 text-white">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddEventModal;