import { Project } from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApirError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import mongoose, { Mongoose, Schema } from "mongoose";



const createProject = asyncHandler(async (req, res) => {
    try {
    


    const { title, description,isPublic,keywords} = req.body
    // const owner=await User.findById(req.user._id)
//    console.log(req.files)

    const thumbnailLocalPath = req.files?.logo[0]?.path;

    if(!thumbnailLocalPath){
        throw new ApiError(407,"logo is required")
    }
    // console.log(thumbnailLocalPath);
    
    const thumbnail=await uploadOnCloudinary(thumbnailLocalPath)

    if(!thumbnail){
        throw new ApiError(500,"internal server error | cloudinary upload error")
    }
//   try
    const project=await Project.create(
        {
            logo:thumbnail.url,
            owner:req.user._id,
            title,
            description,
            keywords,
            isPublic,
            members:[],
            sections:[],
            joinReqs:[],
            
        }
    )

    if(!project) throw new ApiError(500,"internal server error while adding  logo to db")


    // just to confirm that video was addded properly 
    const createdProject = await Project.findById(project._id)

    if(!createdProject) throw new ApiError(500,"internal server error | cant find the logo")

    return res.status(200).json(
        new ApiResponse(200,createdProject,"video added successfully!")
    )


} catch (error) {
    console.log(error.message)
    throw new ApiError(500,error.message)
}

})



const addJoinReq=asyncHandler(async(req,res)=>{

    try {
        
        const {projectId}=req.body;
        const userId=req.user._id;
    
        const project=await Project.findById(projectId);
        // console.log(project);
        
        const isMember = project.members.some((member) => member._id === userId);
        if(!project || project.phase=='closed' ){
            return res.status(409).json(new ApiError(409,"no project found with the given id"));
    
        }

        if(isMember || project.joinReqs.some((r)=>r===userId)) return res.status(200).json(new ApiResponse(200,"already req"))
    
        project.joinReqs.push(userId);
        await project.save();
        return res.status(200).json(new ApiResponse(200,{},"added request to given project"))
        
    } catch (error) {
        throw new ApiError(500,error.message);
        
    }// if(!us)
})



const getAllProjects=asyncHandler(async(req,res)=>{
    const {userId,query="homepage",keywords,limit=10,page=1}=req.query;

    // let projects;

    try {
        const searchQuery={
            $or:[],
        };
        const options={
            limit: parseInt(limit,10) || 10,
            skip: parseInt(page-1,1)*(limit) || 0,
        }

        if(userId){
            searchQuery.$or.push({owner:userId});
            searchQuery.$or.push({member:{$in:[userId]}});
        }
        if(query=="homepage"){
            searchQuery.$or.push({title:{ $regex:"",$options:"i"}});
        }
        else{
            searchQuery.$or.push({title:{$regex:query,$options:"i"}})
        }
        if(keywords && Array.isArray(keywords) && keywords.length>0){
            searchQuery.$or.push({keywords:{$in:keywords}})
        }

        const projects = await Project.find(searchQuery).limit(options.limit).skip(options.skip).populate({
            path:"owner",
            select:["username","avatar"]
        });

        return res.status(200).json(new ApiResponse(200,projects,"projects..."))


        
    } catch (error) {
        console.log(error.message);
        
        throw new ApiError(500,"internal server error");
    }

    
})


const getAllJoinReqs=asyncHandler(async(req,res)=>{
    const {projectid}=req.params;

    // const reqs=await Project.findById(projectid)
    const reqs=await Project.aggregate([
        {
          $match:{
            _id:projectid,
          }  
        },
        {
          $lookup:{
           // reasoning of videos and not Video
            from:"users",
            localField:"joinReqs",
            foreignField:"_id",
            as:"joinReqs",
            
          }
        },
        
   ])

    return res.status(200).json(new ApiResponse(200,reqs,"projects...."))
})




const updateJoinReq=asyncHandler(async(req,res)=>{
    const {userId,projectId,verdict}=req.body;
    const user=await User.findById(userId)

    if(!user) throw new ApiError(404,"bad request")
    const project=await Project.findById(projectId)
    console.log(userId);
    const _id=new mongoose.Types.ObjectId(userId)
    
    project.joinReqs = project.joinReqs.filter((joinreq) => !joinreq.equals(_id));

    console.log(project.joinReqs);
    
    if (!project.members.some((member) => member.equals(_id)) && verdict) project.members.push(_id);

     await project.save();  



    return res.status(200).json(new ApiResponse(200,project,"projects...."))
})


const updateProject=asyncHandler(async(req,res)=>{
    const {description,isPublic,keywords,phase,projectId,title  }=req.body;
    console.log(projectId);
    
    const dbProject=await Project.findById(projectId);

    if(!dbProject) throw new ApiError(409,"bad req")
    dbProject.title=title;
    dbProject.description=description;
    dbProject.phase=phase;
    dbProject.isPublic=isPublic;
    dbProject.keywords=keywords;
        await dbProject.save();

    // console.log(project.joinReqs);
    
    // if (!project.members.some((member) => member.equals(_id)) && verdict) project.members.push(_id);

    //  await project.save();  



    return res.status(200).json(new ApiResponse(200,dbProject,"projects...."))
})


const getProjectDetails=asyncHandler(async(req,res)=>{
    const {projectId}=req.params;

    const project = await Project.findById(projectId)
    .populate({
        path:"owner",
        select:["username","avatar"]
    })
    .populate({
        path:"joinReqs",
        select:["username","avatar"]
    })
    .populate('sections')
    .populate({
        path:"members",
        select:["avatar","username"]
    })             
    console.log(projectId);
    
    return res.status(200).json(new ApiResponse(200,project,"project fetched."));
})
// const 

export {
    createProject,
    addJoinReq,
    getAllJoinReqs,
    getAllProjects,
    updateJoinReq,
    getProjectDetails,
    
    updateProject,
}