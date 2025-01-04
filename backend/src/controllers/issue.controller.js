import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApirError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Issue } from "../models/issues.model.js";


export const addAnIssueToProject = asyncHandler(async (req, res) => {
    const { content, title, owner, project } = req.body;

    if (!content || !title || !owner || !project) {
        throw new ApiError(400, "Content, title, owner, and project are required");
    }

    const newIssue = new Issue({
        content,
        title,
        owner,
        project
    });

    await newIssue.save();

    res.status(201).json(new ApiResponse(201, newIssue, "Issue created and added to the project successfully"));
});


export const getAllIssuesForProject = asyncHandler(async (req, res) => {
    const { projectId } = req.query;

    if (!projectId) {
        throw new ApiError(400, "Project ID is required");
    }

    const issues = await Issue.find({ project: mongoose.Types.ObjectId(projectId) })
        .populate("owner", "username")  
        .populate("project", "title");  

    res.status(200).json(new ApiResponse(200, issues, "Issues fetched successfully"));
});

