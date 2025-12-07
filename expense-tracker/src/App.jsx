import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Routes,Route,Navigate,

} from "react-router-dom"

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Auth/Dashboard";
//import AllGroups from "./pages/Dashboard/AllGroups";

const App = () => {
  return (
    <div className='text -2xl'>
      <Router>
        <Routes>
          <Route path='/' element={<Root/>}></Route>
          <Route path='/login'  exact element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const Root=()=>{
  //check if token exists in local storage
  const isAuthenticated=!!localStorage.getItem("token");

  //redirect to dashboard if authenticated,otherwise to login
  return isAuthenticated?(
    <Navigate to="/dashboard"/>
  ): (
    <Navigate to='/login'/>
  );
};