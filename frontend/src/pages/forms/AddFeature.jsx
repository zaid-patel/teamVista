import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { onAddFeature } from "../../api/project";

const AddFeatureForm = () => {
  const location = useLocation();
  const projectMembers = location.state?.members || [];
  const { register, handleSubmit, reset } = useForm();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [resources, setResources] = useState([]);
  const [resourceInput, setResourceInput] = useState("");
  const navigate = useNavigate();
  const { sectionId } = useParams();

  const onSubmit = async (data) => {
    data.members = selectedMembers;
    data.resources = resources; // Include resources in data
    const res = await onAddFeature({ ...data, assignedTo: data.members, sectionId });
    console.log(res);

    reset();
    setSelectedMembers([]);
    setResources([]); // Clear resources
    navigate("/home");
  };

  const handleAddMember = (member) => {
    if (!selectedMembers.includes(member._id)) {
      setSelectedMembers((prev) => [...prev, member._id]);
    }
  };

  const handleRemoveMember = (memberId) => {
    setSelectedMembers((prev) => prev.filter((id) => id !== memberId));
  };

  const handleFileChange = (e) => {
    setResources([...e.target.files]); // Save selected files
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Feature</h2>

      {/* Feature Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Feature Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title", { required: true })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter feature title"
        />
      </div>

      {/* Description */}
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
          placeholder="Enter description"
        ></textarea>
      </div>

      {/* Deadline */}
      <div className="mb-4">
        <label
          htmlFor="deadline"
          className="block text-gray-700 font-medium mb-2"
        >
          Deadline
        </label>
        <input
          id="deadline"
          type="datetime-local"
          {...register("deadline", { required: true })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

       {/* Add Resources (File Input) */}
       <div className="mb-4">
        <label htmlFor="resources" className="block text-gray-700 font-medium mb-2">
          Add Resources
        </label>
        <input
          id="resources"
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {resources.length > 0 && (
          <div className="mt-2">
            <h4 className="text-gray-700 font-medium mb-2">Selected Files:</h4>
            <ul>
              {Array.from(resources).map((file, index) => (
                <li key={index} className="text-gray-600">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {console.log(projectMembers)
              }
      {/* Add Members */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Members</h3>
        <div className="flex flex-wrap gap-2">
          {projectMembers.map((member, index) => (
            <div
              key={index}
              className={`cursor-pointer flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-blue-100 transition ${
                selectedMembers.includes(member._id)
                  ? "bg-blue-200 border-blue-400"
                  : "bg-gray-100"
              }`}
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Add Feature
      </button>
    </form>
  );
};

export default AddFeatureForm;
