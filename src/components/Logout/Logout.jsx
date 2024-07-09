import React,{ useRef ,useEffect} from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeLoginState } from '../../features/login/loginSlice'

export default function Logout(props) {

    const navRef = useRef();

    const dispatch = useDispatch()
    const Navigate = useNavigate()
    
    useEffect(()=>{
        axios.get('http://localhost:3000/auth/logout',{withCredentials: true})
    .then(response => {
        dispatch(changeLoginState(false));
        Navigate('/')
    })
    .catch(error => {
        console.log("could not log out")
    })
    },[])
    
  return (
    <div>
        <main className='h-screen flex flex-row items-center justify-center'>
            Logging out....
        </main>
    </div>
  )
}
