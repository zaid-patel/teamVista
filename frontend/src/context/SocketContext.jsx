import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { AppContext } from "./AppContext";

const SocketContext = createContext();

const ENDPOINT = "http://localhost:5010"; // Replace with your backend's socket server URL

export const SocketProvider = ({ children }) => {
  const socket = useRef();
   const userData=useContext(AppContext) 
  useEffect(() => {
    socket.current = io(ENDPOINT);
    // console.log(userData);
    
    
    socket.current.on("connected", () => {
        // console.log(userData._id);
        
        // if(userData?._id)socket.current.emit(("setup"),userData._id)  
    //   console.log("Socket connected!");
    });
    // console.log(socket);
    
    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(()=>{
    // console.log(userData.userData);
    if(userData){
    
    
    socket.current.emit("setup",userData.userData._id);
    }
  },[userData])

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
