import React, { useEffect } from "react"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
// import LogoutBtn from "./auth/Logout"
import Container from "./Container"
import Logo from "./logo"

function Header(){
    // useEffect
    // const {status,userData} = useSelector((state)=>state.auth)
      //  const staus=true
       const navigate = useNavigate()
      // const navigate=useNavigate();
     // console.log(status,userData)
      // const items=[
      //     {
      //         navItem:'home',
      //         slug:'/',
      //         status:true,
      //     },
        
      //     {
      //         navItem:'Channel',
      //         slug:`/users/${userData?._id}`,
      //         status:status,
      //     },
      //     {
      //       navItem:'Subscribed Channels',
      //       slug:`/subscribedchannels`,
      //       status:status,
      //     },
      //     {
      //         navItem:'AddVideo',
      //         slug:'/addvideo',
      //         status:status,
      //     },
      //     {
      //       navItem:'Watch History',
      //       slug:'/watchHistory',
      //       status:status,
      //       // staus:''
      //     },
      //     {
      //         navItem:'Login',
      //         slug:'/login',
      //         status:!status,
      //     },
      //     {
      //         navItem:'Signup',
      //         slug:'/signup',
      //         status:!status,
      //     },
          
      // ]
      //  console.log(userData);
      
      return(
          
  
         
                  // {/* Navbar */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <h1 className="text-3xl font-bold hover:scale-110 transition-transform">
        TeamVista
      </h1>
      <nav className="space-x-6">
        <Link
          to="/features"
          className="hover:text-yellow-300 transition-colors"
        >
          Features
        </Link>
        <Link
          to="/about"
          className="hover:text-yellow-300 transition-colors"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="hover:text-yellow-300 transition-colors"
        >
          Contact
        </Link>
      </nav>
    </header>

      )
  }
  export default Header