import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Foot from "./components/Footer/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginState } from "./features/login/loginSlice";

//Motion
import { motion } from "framer-motion";
// variants
import { FadeIn } from "./variants";

export default function Root() {

  const userLoggedIn = useSelector(state => state.login.userLoggedIn)
  const dispatch = useDispatch()

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`,{withCredentials: true})
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
        <motion.div
        variants={FadeIn("down",0.2)}
        initial="hidden"
        animate="show"
        whileInView="show"
        viewport={{ once: true, amount: 0.8 }}
        >
          <Navbar userLoggedIn={userLoggedIn} />
        </motion.div>
        
      </header>
      <Outlet />
      <footer>
        <Foot />
      </footer>
    </main>
  );
}
