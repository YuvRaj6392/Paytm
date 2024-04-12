import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { balanceAtom } from '../../store/atoms/balanceAtom'
import { userBalanceApi } from '../../Api/UserBalanceApi'

import { tokenError } from '../../functions/tokenError'
export default function UserBalance() {
  const [balance,setBalance]=useRecoilState(balanceAtom)


  const getUsersBalance=async()=>{
    const json=await userBalanceApi();
    if(!json.success || tokenError(json)){
      localStorage.removeItem("token")
    }else{
      setBalance(json.balance)
    }
  }

  useEffect(()=>{
    getUsersBalance()
  },[balance])
  return (
    <div className='font-semibold m-5 sm:text-2xl sm:m-8'>
      Your Balance is <span className='ms-2 text-blue-500'>{balance? "$" +balance:"Loading..."}</span>
    </div>
  )
}
