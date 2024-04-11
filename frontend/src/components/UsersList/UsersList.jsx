import React from 'react'
import { useRecoilValue } from 'recoil'
import { usersAtom } from '../../store/atoms/usersAtom'
import Button from '../Button/Button'

export default function UsersList() {
 const users=useRecoilValue(usersAtom)
  return (
    <div className='m-5 sm:m-8'>
       {users && users.map((ele)=>{
        return (
         <div key={ele._id} className='flex justify-between items-center m-2 p-3 shadow-md '>
           <div>
            <p className='text-lg sm:text-2xl font-semibold'>{ele.username}</p>
           </div>
           <Button title={"SEND"}/>
         </div>
        )
       })}
    </div>
  )
}
