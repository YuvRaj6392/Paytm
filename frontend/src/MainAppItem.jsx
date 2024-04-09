import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SingIn from "./components/screens/Signin"
import Dashboard from "./components/screens/Dashboard"
import Send from "./components/screens/Send"
import Signup from "./components/screens/Signup"
export default function MainAppItem() {
  return (
   <Router>
      <Routes>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/signin" element={<SingIn/>}/>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route exact path="/send" element={<Send/>}/>
      </Routes>
    </Router>
  )
}
