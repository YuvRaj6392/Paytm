import React, { useEffect } from 'react'
import UserBalance from '../../UserBalance/UserBalance'
import { useRecoilValue } from 'recoil'
import { tokenAtom } from '../../../store/atoms/tokenAtom'
import Input from '../../Input/Input'
import UsersList from '../../UsersList/UsersList'

export default function Dashboard() {
  const token=useRecoilValue(tokenAtom)

  return (
    <>
      {token && (
        <div>
         <UserBalance />
          <p className='font-semibold m-5 sm:text-2xl sm:m-8'>Users</p>
          <Input />
          <UsersList />
        </div>
      )}
    </>
  )
}
