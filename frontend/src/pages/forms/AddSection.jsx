import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import {onAddSection} from "../../api/project"

const AddSectionForm = () => {
    const location = useLocation();
    const projectMembers = location.state?.members || [];
  const { register, handleSubmit, reset } = useForm();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const navigate=useNavigate();
  const {projectId}=useParams();
  
  

  const onSubmit = async (data) => {
    data.members = selectedMembers; // Include selected members
    const res= await onAddSection({...data,projectId});
    console.log(res);
    
    
    reset(); // Reset the form
    setSelectedMembers([]); // Clear selected members
    navigate('/home')
  };

  const handleAddMember = (member) => {
    if (!selectedMembers.includes(member._id)) {
      setSelectedMembers((prev) => [...prev, member._id]);
    }
  };

  const handleRemoveMember = (memberId) => {
    setSelectedMembers((prev) => prev.filter((id) => id !== memberId));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Section</h2>
      {console.log(projectMembers)}
      {/* Section Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Section Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title", { required: true })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter section title"
        />
      </div>

      {/* Section Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-medium mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter detailed description"
        ></textarea>
      </div>

      
      {/* Add Members */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Members</h3>
        <div className="flex flex-wrap gap-2">
          {projectMembers.map((member,index) => (
            <div
              key={index}
              className={`cursor-pointer flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-blue-100 transition ${
                selectedMembers.includes(member._id)
                  ? "bg-blue-200 border-blue-400"
                  : "bg-gray-100"
              }`}
              draggable
              onClick={() => handleAddMember(member)}
            >
              <img
                src={member.avatar || "/default-avatar.png"}
                alt={member.username}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700 font-medium">{member.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Members */}
      {selectedMembers.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Selected Members
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedMembers.map((memberId) => {
              const member = projectMembers.find((m) => m._id === memberId);
              return (
                <div
                  key={memberId}
                  className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-green-200 border-green-400"
                >
                  <img
                    src={member.avatar || "/default-avatar.png"}
                    alt={member.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700 font-medium">{member.username}</span>
                  <button
                    onClick={() => handleRemoveMember(memberId)}
                    className="text-red-500 font-bold hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Add Section
      </button>
    </form>
  );
};

export default AddSectionForm;
