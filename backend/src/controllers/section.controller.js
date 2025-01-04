import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApirError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Section } from "../models/section.model.js";
import { Project } from "../models/project.model.js";


const addSection = asyncHandler(async (req, res) => {
    try {
    


    const { title, description,projectId,members=[]} = req.body

    const project=await Project.findById(projectId);
    

        // console.log(project.owner==req.user._id);
        
    if(!title || !project){
        throw new ApiError(404,"no project found | no title provided")
    }
//   try
    const section=await Section.create(
        {
            title,
            description,
            project:project._id,
            memebers:members,
            features:[],
            resources:[],
            
            
        }
    )

    if(!section) throw new ApiError(500,"internal server error while adding  section to db")


    project.sections.push(section._id);
    await project.save();

        return res.status(200).json(
        new ApiResponse(200,section,"section added successfully!")
    )


} catch (error) {
    console.log(error.message)
}

})


const addMembers=asyncHandler(async(req,res)=>{
    try {
        const {userIds,sectionId}=req.body;

        const section=await Section.findById(sectionId);
        section.members.push(...userIds);
        await section.save();

        return res.status(200).json(new ApiResponse(200,section,"added memebrs"));


    } catch (error) {
        console.log(error.message)
        return res.status(500).json(new ApiError(500,error.message))
    }
})


const getSection=asyncHandler(async(req,res)=>{
    const {sectionId}=req.params;
    console.log(sectionId);
    
    const section = await Section.findById(sectionId)
            .populate('project') 
            .populate({
                path: 'features', 
                populate: {
                    path:"assignedTo",
                    select:"username"
                } 
            })
            .populate('resources')
            .populate({
                path:'memebers',
                select:'username',
            }
            ); 
    return res.status(200).json(new ApiResponse(200,section,"secton fetched."));
})






export {
    addSection,
    addMembers,
    getSection,
}
