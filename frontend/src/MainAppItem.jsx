import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SingIn from "./components/screens/Signin"
import Dashboard from "./components/screens/Dashboard"
import Send from "./components/screens/Send"
import Signup from "./components/screens/Signup"
import Header from './components/Header/Header'
import { PrivateRoute } from './functions/PrivateRoute'
import Error from './components/screens/Error/Error'

export default function MainAppItem() {

  const showHeader = window.location.pathname !== '/signup' && window.location.pathname !== '/signin'

  return (
    <Router>
      {showHeader && <Header />}
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<SingIn />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/send" element={<Send />} />
        </Route>
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  )
}