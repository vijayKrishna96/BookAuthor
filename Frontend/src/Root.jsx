import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Foot from "./components/Footer/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginState } from "./features/login/loginSlice";

export default function Root() {

  const userLoggedIn = useSelector(state => state.login.userLoggedIn)
  const dispatch = useDispatch()

  useEffect(()=>{
    axios.get('http://localhost:3000/auth/verify',{withCredentials: true})
    .then(response => {
        dispatch(changeLoginState(true))
    })
    .catch(error => {
        dispatch(changeLoginState(false))
    })
  },[])

  return (
    <main>
      <header>
        <Navbar userLoggedIn={userLoggedIn} />
      </header>
      <Outlet />
      <footer>
        <Foot />
      </footer>
    </main>
  );
}
