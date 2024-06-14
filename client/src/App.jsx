import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./Login"
import SignUp from "./SignUp"
import Home from "./Home"
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const App = () => {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/resetpassword/:token" element={<ResetPassword/>} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
