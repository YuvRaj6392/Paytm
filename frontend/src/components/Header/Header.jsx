import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Header() {
    const history=useNavigate()
  return (
    <div className='flex justify-between items-center shadow-lg p-2 sm:p-4'>
      <div className='text-2xl font-extrabold sm:text-4xl cursor-pointer' onClick={()=>{
        history('/')
      }}>
        <span className='text-blue-900'>Pay</span><span className='text-blue-500'>tm</span>
      </div>
      <div className=' flex justify-between items-center space-x-2'>
        <div className='text-xl font-normal sm:text-2xl'>
          Hello, User
        </div>
        <div onClick={()=>{
          localStorage.removeItem("token")
          window.location.reload()
        }} className='text-xl font-normal sm:text-2xl bg-red-700 py-1 px-2 text-white rounded-md cursor-pointer'>
          Logout 
        </div>
      </div>

    </div>
  )
}
