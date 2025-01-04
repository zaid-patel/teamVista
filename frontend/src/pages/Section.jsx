import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router";
import { useSocket } from "../context/SocketContext";
import { AppContext } from "../context/AppContext";

const SectionPage = () => {
  const { sectionId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [section, setSection] = useState();
  const [showMessages, setShowMessages] = useState(true);
  const [leftWidth, setLeftWidth] = useState(33); 
  const [isDragging, setIsDragging] = useState(false);
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userData=useContext(AppContext);

  useEffect(() => {
    const getSection = async () => {
      try {
        const res = await axios.get(`/api/v1/sections/${sectionId}`);
        // console.log(res);
        if (res.data.success) setSection(res.data.data);
        // console.log(res.data.data);
        
        setMessages(res.data.data.messages || []);
        const res2=await axios.get(`api/v1/messages/${sectionId}`);
        if(res2.data.success) setMessages(res.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const joinRoom = () => {
        if (sectionId) {
            console.log("from join chat "+sectionId);
            
          socket.emit("join chat", sectionId);
          console.log(`Joined room: ${sectionId} `);
        }
      };

    
    getSection();
    joinRoom();  
    // console.log(userData);
    
  }, [sectionId]);

//   useEffect(() => {
//     socket.on('message', (newMessage) => {
//       console.log('New message received:', newMessage);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });
  
//     return () => {
//       socket.off('message'); // Clean up the listener on unmount
//     };
//   }, []);


  useEffect(() => {
    // console.log(socket);
    
    socket.on("message received", (newMessage) => {
        console.log("Message received:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log(newMessage);
      
    });
    return () => {
      socket.off("message recieved");
    };
  }, []);


  const sendMessage = () => {
    if (message && sectionId) {
      const newMessage = {
        chat: sectionId,
        owner:userData.userData.username,
        content: message,
        ownerId:userData.userData._id,
      };
    //   console.log("from sendmessage"+userData.userData.username);
      
      if(socket) socket.emit("new message", newMessage);
    //   setMessages((prev)=>[...prev,newMessage])
    //   setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  }; 



  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) {
      setLeftWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!section)
    return <div>No section found with the given ID.</div>;

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div
        className="bg-gray-100 border-r border-gray-300 p-4"
        style={{ width: `${leftWidth}%` }}
      >
        {/* Section Title and Description */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{section.title}</h1>
          <p className="text-gray-600 mt-2">{section.description}</p>
        </div>
  
        {/* Add Buttons */}
        <div className="mb-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-400 transition w-full mb-2">
            <Link to={`/${sectionId}/add`} state={{ members: section.members }}>
              + Add Feature
            </Link>
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded shadow-lg hover:bg-green-400 transition w-full">
            + Add Document
          </button>
        </div>
  
        {/* Features */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Features</h2>
          <ul className="mt-4 space-y-2">
            {section.features?.length > 0 ? (
              section.features.map((feature) => {
                const deadlineTime = new Date(feature.deadline);
                const timeLeft = Math.max(
                  (deadlineTime - Date.now()) / (1000 * 60 * 60),
                  0
                );
                const formattedTime =
                  timeLeft > 24
                    ? `${Math.floor(timeLeft / 24)} days`
                    : `${Math.floor(timeLeft)} hours`;
  
                return (
                  <li
                    key={feature._id}
                    className="bg-white p-3 rounded shadow hover:shadow-lg border border-gray-200"
                  >
                    <details className="mt-2">
                      <summary className="text-blue-600 cursor-pointer hover:text-blue-800 flex justify-center items-center">
                        <h3 className="font-bold text-gray-700">
                          {feature.title}
                        </h3>
                      </summary>
                      <div className="mt-2 p-2 border-t border-gray-300">
                        {feature.assignedTo?.length > 0 ? (
                          <ul className="list-disc list-inside text-gray-600">
                            {feature.assignedTo?.map((user) => (
                              <li key={user._id}>@{user.username}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600">No members assigned.</p>
                        )}
                        <p className="text-gray-600">
                          Deadline in {formattedTime || "less than an hour"}.
                        </p>
                      </div>
                    </details>
                  </li>
                );
              })
            ) : (
              <p className="text-gray-600">No features added yet.</p>
            )}
          </ul>
        </div>
      </div>
  
      {/* Draggable Splitter */}
      <div
        className="w-1 bg-gray-400 cursor-col-resize"
        onMouseDown={handleMouseDown}
      ></div>
  
      {/* Right Section: Messages */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between bg-gray-200 p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          <button
            onClick={() => setShowMessages((prev) => !prev)}
            className="bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-700 transition"
          >
            {showMessages ? "Hide Messages" : "Show Messages"}
          </button>
        </div>
        {showMessages && (
          <div className="flex flex-col flex-1 bg-white p-4 overflow-y-auto">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              {messages?.length > 0 ? (
                messages.map((message,index) => (
                  <div
                    key={index}
                    className="mb-4 p-3 bg-gray-100 rounded shadow border border-gray-200"
                  >
                    <p className="font-bold text-gray-700">
                      {message.owner}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{message.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No messages yet.</p>
              )}
            </div>
  
            {/* Input Box */}
            <div className="mt-4 flex">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}  
                className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-400 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default SectionPage;
