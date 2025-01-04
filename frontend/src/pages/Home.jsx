import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import { AppContext } from "../context/AppContext";


const HomePage = () => {
  const { projects } = useContext(AppContext);

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-purple-800 text-white min-h-screen">
    <Header />
    {/* Projects Section */}
    <section className="container mx-auto px-4 py-16">
      <h3 className="text-4xl font-bold text-center mb-10">Available Projects</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="flex flex-col justify-between p-4 bg-white text-coolGray-900 rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-4"
          >
            {/* Logo and Details */}
            <Link to={`/project/${project?._id}`}>
            <div className="flex items-center">
              {/* Logo */}
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                className="w-16 h-16 rounded-md mr-4"
              />
              {/* Title and Keywords */}
              <div>
                <h4 className="text-xl font-bold mb-2 text-purple-700">
                  {project.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-200 text-blue-800 text-sm py-1 px-3 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            </Link>
  
            {/* Owner Details */}
            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <div className="flex items-center">
                <img
                  src={project.owner.avatar || "https://via.placeholder.com/50"}
                  alt={`${project.owner.username}'s avatar`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <p className="text-gray-700">
                  <span className="font-semibold">Owner: </span>
                  {project.owner.username || "John Doe"}
                </p>
              </div>
              {/* Project Phase */}
              <p className="text-sm font-semibold text-gray-700">
                Phase: <span className="text-purple-600">{project.phase || "N/A"}</span>
              </p>
            </div>
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

export default HomePage;
