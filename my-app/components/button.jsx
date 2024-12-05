import React from 'react'

function Button({onClick, children}) {
  return (
    <button onClick={onClick} className='rounded-full text-white bg-blue-600 px-3 py-1'>{children}</button>
  )
}

export default Button