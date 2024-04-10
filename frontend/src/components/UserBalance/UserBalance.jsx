import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { balanceAtom } from '../../store/atoms/balanceAtom'
import { userBalanceApi } from '../../Api/UserBalanceApi'
import {tokenAtom} from "../../store/atoms/tokenAtom"
export default function UserBalance() {
  const [balance,setBalance]=useRecoilState(balanceAtom)
  const [token,setToken]=useRecoilState(tokenAtom)


  const getUsersBalance=async(token)=>{
    const json=await userBalanceApi(token);
    if(!json.success){
      setToken(localStorage.removeItem("token"))
    }else{
      setBalance(json.balance)
    }
  }

  useEffect(()=>{
    setTimeout(getUsersBalance(token),2000)
  },[balance])
  return (
    <div className='font-semibold m-5 sm:text-2xl sm:m-8'>
      Your Balance is <span className='ms-2 text-blue-500'>{balance? "$" +balance:"Loading..."}</span>
    </div>
  )
}
