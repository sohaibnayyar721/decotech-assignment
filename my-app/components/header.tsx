import React from 'react'
import Button from './button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { format, getHours } from 'date-fns'

function Header({ date, handleNextWeek, handlePreviousWeek}) {
  return (
    <div className='flex items-center justify-between mt-4 px-3'>
        <div className='flex flex-col gap-5'>
          <p className='text-2xl font-bold'>Calender</p>
          <Button onClick={handlePreviousWeek}>
            <div className='flex gap-1 items-center'>
              <ArrowBackIosIcon style={{ fontSize: '15px' }} />
              <p>Previous Week</p>
            </div>
          </Button>
        </div>

        <p>{format(date, 'LLLL yyyy')}</p>

        <div className='flex flex-col gap-5'>
          <Button onClick={()=>console.log('hello world')}>
            <p>Add Event</p>
          </Button>
          <Button onClick={handleNextWeek}>
            <div className='flex gap-1 items-center'>
              <p>Next Week</p>
              <ArrowForwardIosIcon style={{ fontSize: '15px' }} />
            </div>
          </Button >
        </div>
      </div>
  )
}

export default Header