import React, { useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const featuresRef = useRef(null);
  const navigate=useNavigate();
  const {token,userData}= useContext(AppContext);
  if(token && userData) navigate('/home')
  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-purple-800 text-white min-h-screen">
      {/* Navbar */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold hover:scale-110 transition-transform">
          TeamVista
        </h1>
        <nav className="space-x-6">
          <button
            onClick={scrollToFeatures}
            className="hover:text-yellow-300 transition-colors"
          >
            Features
          </button>
          <a href="#about" className="hover:text-yellow-300 transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-yellow-300 transition-colors">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20">
        <h2 className="text-5xl font-extrabold leading-tight animate-fade-in-down">
          Empower Collaboration <br />
          <span className="text-yellow-300">Build Amazing Projects</span>
        </h2>
        <p className="text-lg mt-4 animate-fade-in-up">
          Join a vibrant community of creators, collaborate on tasks, chat, and bring your ideas to life.
        </p>
        <button className="mt-6 bg-rose-500 text-white py-3 px-6 rounded-full font-bold shadow-lg hover:bg-rose-400 transition">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        id="features"
        className="container mx-auto px-4 py-16"
      >
        <h3 className="text-4xl font-bold text-center mb-10">Our Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Project Discovery", text: "Find exciting projects and join hands with like-minded people." },
            { title: "Task Management", text: "Organize your work and get tasks assigned with ease." },
            { title: "Real-Time Communication", text: "Chat and video call to discuss project ideas seamlessly." },
            { title: "Bug Reporting", text: "Collaboratively identify and resolve bugs in projects." },
            { title: "Profile Showcase", text: "Create a professional profile to showcase your skills and projects." },
            { title: "Collaboration Tools", text: "Access powerful tools for productive teamwork and creativity." },
          ].map((feature, idx) => (
            <div  
              key={idx}
              className="p-6 bg-white text-coolGray-900 rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-4 animate-bounce-in"
            >
              <h4 className="text-xl font-bold mb-2 text-purple-700">{feature.title}</h4>
            {/* {  console.log(feature.text) } */}
              
              <p  className="mb-2 text-blue-400">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>&copy; 2024 TeamVista. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
