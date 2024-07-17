import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeLoginState } from '../../features/login/loginSlice';

export default function LoginForm({ closeModal, showSignupForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password
    };

    axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,data , {withCredentials: true})
      .then(response => {
        dispatch(changeLoginState(true))
        navigate('/')
      })
      .catch(error => {
        dispatch(changeLoginState(false))
      })
    // Add your login logic here
    closeModal();
  };

  return (
    <form onSubmit={handleLogin} action="" className="bg-white border border-sky-500 w-50rem p-8 shadow-neutral-950 rounded-md m-8">
      <h3 className="text-3xl text-center uppercase text-black font-semibold">Sign in</h3>
      <div className="flex flex-col p-8 mt-3">
        <label className="text-2xl my-2">Email</label>
        <input
          type="email"
          className="box my-5"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className="text-2xl my-2">Password</label>
        <input
          type="password"
          className="box my-5"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="check-box flex items-center gap-2 px-8">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <input type="submit" value="Sign in" className="btn text-center w-full my-5 bg-slate-500 p-2 text-lg text-white" />
      <p>Forgot password? <a href="#" className="text-sky-500">Click here</a></p>
      <p>Don't have an account? <a href="#" className="text-sky-500" onClick={showSignupForm}>Create an account</a></p>
    </form>
  );
}


