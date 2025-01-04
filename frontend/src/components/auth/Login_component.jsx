import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {Button, Input, Logo} from '../index.js'
import { login as BackendLogin } from '../../api/auth.js'
import { AppContext } from '../../context/AppContext.jsx'

function LoginComponent() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()
    const { backendUrl, token, setToken ,setUserData} = useContext(AppContext)

    const login = async(data) => {
        setError("")
        try {
          const res = await BackendLogin(data);
          console.log(res.user);
          
          if (res?.user && res?.accesstoken) {
            const { user, accesstoken } = res;
        
            // Save token to localStorage
            localStorage.setItem('token', accesstoken);
            console.log("User Data:", user);
        
            // Set token state (if part of global context or local state)
            setToken(accesstoken);
            setUserData(user)
        
            // Navigate to the homepage
            navigate("/");
          } else {
            console.error("Login failed: Invalid response structure");
            // Optionally display an error message to the user
          }
        } catch (error) {
          console.error("Login error:", error);
          // Optionally display an error message to the user
        }
        
    }

   

  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Dont have an account?&nbsp;
                    <Link
                        to="/register"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up 
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)}>
                    <div className='space-y-5'>
                       
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default LoginComponent