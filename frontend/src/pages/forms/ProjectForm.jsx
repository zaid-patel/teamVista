import React, { useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { addOrUpadeProject } from "../../api/project";
import { AppContext } from "../../context/AppContext";

const ProjectForm = () => {
  const location = useLocation();
  const initialData=location.state.project 
  console.log(initialData);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // logo: initialData?.logo || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
      keywords: initialData?.keywords || [""],
      isPublic: initialData?.isPublic || true,
      phase: initialData?.phase || "ideation",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keywords",
  });
  const navigate=useNavigate();
  const {getprojects}=useContext(AppContext) 

  const submitHandler = async(data) => {
    console.log("Form Data:", data);
    if (addOrUpadeProject) {
        try {
            const res=await addOrUpadeProject(data,initialData);
            getprojects();
            navigate('/home')  
        } catch (error) {
            console.log(error.message);
            
        }
          
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-3xl mx-auto p-8 border border-gray-300 rounded-lg shadow-lg bg-white"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {initialData?.title ? "Update Project" : "Add Project"}
      </h1>

      {/* Logo */}
      {!initialData &&
      <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700">
          Logo URL
        </label>
        
        <input
          {...register("logo", { required: "Logo is required" })}
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          placeholder="choose file"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-300"
        />
        {errors.logo && (
          <p className="text-sm text-red-500">{errors.logo.message}</p>
        )}
      </div>
         }

      {/* Title */}
      <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700">
          Project Title
        </label>
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Enter project title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-300"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          placeholder="Enter project description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-300"
        />
      </div>

      {/* Keywords */}
      <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700">Keywords</label>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <input
                {...register(`keywords.${index}`)}
                placeholder={`Keyword ${index + 1}`}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-300"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="px-3 py-1 text-red-500 bg-gray-100 rounded-md shadow-sm hover:bg-red-100 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append("")}
            className="px-4 py-2 mt-2 text-white bg-purple-500 rounded-md shadow-lg hover:bg-purple-400 transition"
          >
            Add Keyword
          </button>
        </div>
      </div>

      {/* Is Public */}
      <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700">Visibility</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              {...register("isPublic")}
              type="radio"
              value={true}
              className="mr-2"
              defaultChecked
            />
            Public
          </label>
          <label className="flex items-center">
            <input
              {...register("isPublic")}
              type="radio"
              value={false}
              className="mr-2"
            />
            Private
          </label>
        </div>
      </div>

      {/* Phase */}
      <div className="mb-6">
        <label className="block font-medium mb-2 text-gray-700">Phase</label>
        <select
          {...register("phase")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-300"
        >
          <option value="ideation">Ideation</option>
          <option value="development">Development</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-green-500 rounded-md shadow-lg hover:bg-green-400 transition"
      >
        {initialData?.title ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
