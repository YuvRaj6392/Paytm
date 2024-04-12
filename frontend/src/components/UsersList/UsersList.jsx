import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { usersAtom } from '../../store/atoms/usersAtom'
import { transferToAtom } from '../../store/atoms/transferToAtom'
import {useNavigate} from "react-router-dom"

export default function UsersList() {
 const users=useRecoilValue(usersAtom)
 const setTo=useSetRecoilState(transferToAtom)
 const history=useNavigate()
 
  return (
    <div className='m-5 sm:m-8'>
       {users && users.map((ele)=>{
        return (
         <div key={ele._id} className='flex justify-between items-center m-2 p-3 shadow-md '>
           <div>
            <p className='text-lg sm:text-2xl font-semibold'>{ele.username}</p>
           </div>
           <div onClick={()=>{
            setTo(ele._id)
            history('/send')
            
           }} className='bg-black text-white p-2 px-4 cursor-pointer'>
             SEND
           </div>
         </div>
        )
       })}
    </div>
  )
}
