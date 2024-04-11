import React from 'react'

export default function Button({title}) {
  return (
    <div className='bg-black text-white p-2 px-4 cursor-pointer'>
     {title}
    </div>
  )
}
