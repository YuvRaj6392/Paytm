import React from 'react'
import UserBalance from '../../UserBalance/UserBalance'
import { useRecoilValue } from 'recoil'
import { tokenAtom } from '../../../store/atoms/tokenAtom'

export default function Dashboard() {
  const token=useRecoilValue(tokenAtom)
  return (
    <div>
     {token && <UserBalance/>}
    </div>
  )
}
