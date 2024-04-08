import React from 'react'
export default function CredButton({buttonName,handler}) {
  
  return (
    <div onClick={()=>{
    alert(handler)
    }} className='bg-black h-10 flex justify-center items-center text-white w-[75%] m-auto cursor-pointer'>
    {buttonName}
    </div>
  )
}
