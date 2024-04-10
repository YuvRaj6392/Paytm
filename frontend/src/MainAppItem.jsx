import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SingIn from "./components/screens/Signin"
import Dashboard from "./components/screens/Dashboard"
import Send from "./components/screens/Send"
import Signup from "./components/screens/Signup"
import { useRecoilValue } from 'recoil'
import { tokenAtom } from './store/atoms/tokenAtom'
import Header from './components/Header/Header'
export default function MainAppItem() {
  const token=useRecoilValue(tokenAtom)
  useEffect(()=>{
    if(!token && window.location.pathname!=="/signup" && window.location.pathname!=="/signin"){
      window.location.href = '/signin';
    }
  },[token])
  const showHeader = window.location.pathname !== '/signup' && window.location.pathname !== '/signin';
  return (
   <Router>
       {showHeader &&  <Header/> }
      <Routes>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/signin" element={<SingIn/>}/>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route exact path="/send" element={<Send/>}/>
      </Routes>
    </Router>
  )
}
