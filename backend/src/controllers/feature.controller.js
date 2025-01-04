import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApirError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Feature } from "../models/feature.model.js";
import { Section } from "../models/section.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



export const createFeature = asyncHandler(async (req, res) => {
    const { sectionId, title, description, deadline, assignedTo } = req.body;

    try {
        
        const dbSection=await Section.findById(sectionId)
    
        if (!dbSection || !title || !deadline) {
            throw new ApiError(400, "Valid Section, title, and deadline are required");
        }

    
        let resourcesLocalPath=[];
        if (req.files && Array.isArray(req.files.resources) && req.files.resources.length > 0) {
            req.files.resources.map((resource)=>resourcesLocalPath.push(resource.path))
            // resourcesLocalPath = req.files.resources[0].path
        }
        
        let resources=[];
        // const avatar=await uploadOnCloudinary(avatarLocalPath)  // await exclusively again used as we need to wait here eventhough the whole fn is in a promise
        if(resourcesLocalPath.length>0){
            for (const resource of resourcesLocalPath) {
                try {
                  const response = await uploadOnCloudinary(resource); // Assuming this is an async function
                  if (response?.url) {
                    resources.push(response.url);
                  }
                } catch (error) {
                  console.error(`Error uploading resource ${resource}:`, error);
                }
              }
        }
        
       
         
        const feature = new Feature({ 
            section:sectionId, 
            title,
             description, 
             deadline, 
             assignedTo,
             resources,
            });
        await feature.save();
        if(feature._id){
        dbSection.features.push(feature._id)
        await dbSection.save();
        }
    
        res.status(201).json(new ApiResponse(201, feature, "Feature created successfully"));
    } catch (error) {
        throw new ApiError(500,"internal server eror")
    }
});


export const getFeatureById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const feature = await Feature.findById(id).populate('section').populate('assignedTo');
    if (!feature) {
        throw new ApiError(404, "Feature not found");
    }

    res.status(200).json(new ApiResponse(200, feature, "Feature fetched successfully"));
});


export const updateFeature = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const feature = await Feature.findByIdAndUpdate(id, updateData, { new: true }).populate('section').populate('assignedTo');
    if (!feature) {
        throw new ApiError(404, "Feature not found");
    }

    res.status(200).json(new ApiResponse(200, feature, "Feature updated successfully"));
});

export const markFeatureAsCompleted = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const feature = await Feature.findByIdAndUpdate(
        id,
        { isCompleted: true },
        { new: true }
    );
    if (!feature) {
        throw new ApiError(404, "Feature not found");
    }

    res.status(200).json(new ApiResponse(200, feature, "Feature marked as completed"));
});



export const listFeatures = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sectionId } = req.query;

    // Build the base aggregation query
    const aggregationQuery = [
        { $sort: { createdAt: -1 } } // Sort by createdAt in descending order
    ];

    // If a sectionId is provided, add a match stage to filter by section
    if (sectionId) {
        aggregationQuery.unshift({ $match: { section: mongoose.Types.ObjectId(sectionId) } });
    }

    // Use aggregate pagination with the aggregation query
    const features = await Feature.aggregatePaginate(
        Feature.aggregate(aggregationQuery),
        { page, limit }
    );

    res.status(200).json(new ApiResponse(200, features, "Features fetched successfully"));
});


