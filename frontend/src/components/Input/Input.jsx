import React, { useEffect, useState } from 'react'
import {FetchUsersApi} from '../../Api/FetchUsersApi'
import {  useRecoilState } from 'recoil'
import { tokenError } from '../../functions/tokenError'

import {usersAtom} from '../../store/atoms/usersAtom'

export default function Input() {
 const [input,setInput]=useState("")
 const [users,setUsers]=useRecoilState(usersAtom)
 const giveUsers=async (e)=>{
  if(e){
   setInput(e.target.value)
  }
  const json = await FetchUsersApi(input)
 
  if(!json.success || tokenError(json)){
   localStorage.removeItem("token")
  }else{
   setUsers(json.user)
  }
 }

 useEffect(()=>{
  giveUsers(input)
 },[])

  return (
    <div className='m-5 sm:m-8'>
     <input onInput={(e)=>{
      giveUsers(e)
     }} className='h-10 w-full border border-slate-700 shadow-md px-10' type="text" placeholder='Search users...' />
     
    </div>
  )
}
