import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming routing is set up
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { getProject } from "../api/project";
import { Link } from "react-router-dom";


const Project = () => {
  const { projectId } = useParams(); 
  const { userData } = useContext(AppContext); 
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [joinRequestSent, setJoinRequestSent] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [joinReqs,setJoinReqs]=useState([])

  React.useEffect(() => {
    const fetchProject = async () => {
        setLoading(true)
       const res=await getProject(projectId)
        // console.log(res);
        
    //    setProject(res);
       setProject(res);
       setJoinReqs(res.joinReqs)
       setLoading(false)

    // console.log("Updated project state:", res); 
    };

    fetchProject();
  }, [projectId]);

  // Handle join request
  const handleJoinRequest = async () => {
    try {
        console.log(joinRequestSent);
        
      const res=await axios.post(`/api/v1/projects/addJoinReq`, { 
        projectId:project?._id,
        userId: userData._id 
    });
     console.log(res);
     
      setJoinRequestSent(true);
    } catch (error) {
      console.error("Error sending join request:", error);
    }
  };

  const handlereqApprove=async(verdict,userId)=>{
    console.log(verdict);
    
    const res=await axios.patch('/api/v1/projects/updateJoinReq',{
        projectId,
        verdict,
        userId:userId,
    })

    setProject(res.data.data)
    // if(res.s)
  }

  if (loading) {
    return <div className="text-center">Loading project details...</div>;
  }

  if (!project) {
    return <div className="text-center">Project not found!</div>;
  }

  const isOwner = project.owner._id === userData._id;
  const isMember = project.members.some((member) => member._id === userData._id);
  const canJoin = !isOwner && !isMember;

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-purple-800 text-white min-h-screen relative">
        {/* <Header /> */}
      <div className="container mx-auto px-4 py-16 relative">
        {/* Dropdown for Join Requests */}
        {isOwner && (
  <div className="absolute top-6 right-6">
    <div className="flex items-center space-x-4">
      {/* Add Section Button */}

      <Link
        to={`/${projectId}/update`}
        state={{ project: project }}
        className="w-10 h-10 flex items-center justify-center border border-gray-300 bg-gray-100 text-gray-800 rounded-full shadow-md hover:bg-gray-200 transition duration-200"
      >
        Edit
      </Link>

      <Link
        to={`/${projectId}/addSection`}
        state={{ members: project.members }}
        className="w-10 h-10 flex items-center justify-center border border-gray-300 bg-gray-100 text-gray-800 rounded-full shadow-md hover:bg-gray-200 transition duration-200"
      >
        +
      </Link>



      {/* Requests Button */}
      <button
        onClick={() => setShowRequests((prev) => !prev)}
        className="relative bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg"
      >
        {/* Bell Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.917V4a1 1 0 00-2 0v1.083A6.002 6.002 0 006 11v3.159c0 .417-.162.82-.405 1.112L4 17h5m6 0a3 3 0 11-6 0h6z"
          />
        </svg>

        {/* Badge for the Number of Requests */}
        {project.joinReqs.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full transform translate-x-2 -translate-y-2 shadow-lg">
            {project.joinReqs.length}
          </span>
        )}
      </button>
    </div>

            {/* Join Requests Panel */}
            {showRequests && (
              <div className="absolute right-0 top-14 bg-white text-coolGray-900 p-4 rounded-lg shadow-lg w-64">
                <h3 className="text-lg font-bold mb-4 text-purple-700">
                  Join Requests
                </h3>
                <div className="max-h-60 overflow-y-auto">
                  {joinReqs?.length>0 ? (
                    joinReqs.map((user,index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between mb-4"
                      >
                        <div className="flex items-center">
                          <img
                            src={user.avatar}
                            alt={`${user.username}'s avatar`}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <p>{user.username}1</p>
                        </div>
                        <div className="flex gap-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-full text-sm"
                  onClick={() => handlereqApprove(true,user._id)} // Replace with actual accept logic
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-full text-sm"
                  onClick={() => handlereqApprove(false,user._id)} // Replace with actual reject logic
                >
                  Reject
                </button>
              </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No join requests</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Project Details */}
        <div className="bg-white text-coolGray-900 p-6 rounded-xl shadow-xl flex gap-8">
  {/* Left Column */}
  <div className="flex-1 border-r border-gray-300 pr-6">
    {/* Project Logo and Title */}
    <div className="flex items-center mb-8">
      <img
        src={project.logo}
        alt={`${project.title} logo`}
        className="w-24 h-24 rounded-md border-2 border-gray-300 mr-6"
      />
      <div>
        <h1 className="text-4xl font-semibold text-purple-800">{project.title.charAt(0).toUpperCase() + project.title.slice(1)}</h1>
        <p className="text-gray-500">
          {project.phase.charAt(0).toUpperCase() + project.phase.slice(1)}
        </p>
      </div>
    </div>

    {/* Project Description */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold border-b-4 text-purple-800 border-purple-500 pb-2 mb-4">Description</h2>
      <p className="text-gray-700">{project.description || "A fullstack project using cutting edge technologies"}</p>
    </div>

    {/* Project Keywords */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold border-b-4 text-purple-800 border-purple-500 pb-2 mb-4">Keywords</h2>
      <div className="flex flex-wrap gap-4">
        {project.keywords.map((keyword, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-800 text-sm py-2 px-4 rounded-full border-2 border-blue-300"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>

    {/* Owner Info */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold border-b-4 text-purple-800 border-purple-500 pb-2 mb-4">Owner</h2>
      <div className="flex items-center">
        <img
          src={project.owner.avatar || "https://via.placeholder.com/50"}
          alt={`${project.owner.username}'s avatar`}
          className="w-14 h-14 rounded-full border-2 border-gray-300 mr-6"
        />
        <p className="text-gray-700 text-lg">@{project.owner.username}</p>
      </div>
    </div>

    {/* Members */}
    <div>
      <h2 className="text-2xl font-semibold border-b-4 text-purple-800 border-purple-500 pb-2 mb-4">Members</h2>
      <div className="flex flex-wrap gap-6 mt-4">
        {project.members.map((member) => (
          <div
            key={member._id}
            className="flex items-center gap-1 bg-gray-100 border-2 border-gray-300 px-4 py-2 rounded-xl shadow-sm"
          >
            <img
              src={member.avatar || "https://via.placeholder.com/30"}
              alt={`${member.username}'s avatar`}
              className="w-10 h-10 rounded-full"
            />
            <p className="text-gray-700 ">@{member.username}</p>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Right Column: Sections */}
  <div className="flex-1 pl-6">
    <h2 className="text-2xl font-semibold border-b-4 border-purple-500 pb-2 mb-6">Project Sections</h2>
    <div className="flex flex-col gap-6">
      {project.sections?.length > 0 ? (
        project.sections.map((section, idx) => (
          
          <div
            key={idx}
            className="p-6 border-2 border-gray-200 rounded-xl shadow-sm bg-gray-50"
          >
            <Link to={`/sections/${section._id}`}>
            <h3 className="font-semibold text-xl text-purple-700">{section.title}</h3>
            <p className="text-gray-700 mt-2">{section.description}</p>
            </Link>
          </div>
          
        ))
      ) : (
        <p className="text-gray-600">
          {userData?._id === project.owner && (
            <div>
              <Link to={`/${projectId}/add`} className="text-blue-500 underline">
                Add sections
              </Link>
            </div>
          )}
        </p>
      )}
    </div>
  </div>
</div>

{/* Join Request Button */}
{canJoin && (
  <div className="mt-8 text-center">
    {!joinRequestSent ? (
      <button
        onClick={handleJoinRequest}
        className="bg-rose-500 text-white py-3 px-6 rounded-full font-bold shadow-lg hover:bg-rose-400 transition"
      >
        Request to Join
      </button>
    ) : (
      <p className="text-green-500 font-semibold mt-4">Join request sent!</p>
    )}
  </div>
//   </div>
//   </div>
)
}

</div>
</div>
  )}
{/* }; */}

export default Project;
