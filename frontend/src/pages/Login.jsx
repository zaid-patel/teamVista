import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
// import { useContext } from 'react'
import LoginComponent from '../components/auth/Login_component'

const Login = () => {

  

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  

  // useEffect(() => {
  //   if (token) {
  //     console.log(token);
      
  //     navigate('/')
  //   }
  // }, [token])

  return (
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>Login</p>
        <p>Please log in to start collaborating</p>
      
           <LoginComponent />

      </div>
  )
}

export default Login