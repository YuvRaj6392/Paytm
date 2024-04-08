import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

import SingIn from "./components/screens/Signin"
import Dashboard from "./components/screens/Dashboard/Dashboard"
import Send from "./components/screens/Send/Send"
import Signup from "./components/screens/Signup"
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/signin" element={<SingIn/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        <Route exact path="/send" element={<Send/>}/>
      </Routes>
    </Router>
  )
}

export default App
