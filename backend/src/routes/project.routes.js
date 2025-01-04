import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { verfiyJwt } from "../middlewares/auth.middleware.js";
import { addJoinReq, createProject, getAllJoinReqs, getAllProjects, getProjectDetails, updateJoinReq, updateProject } from "../controllers/project.controller.js";


const projectRouter=Router()

// projectRouter.use(verfiyJwt)




projectRouter.route("/create").post(
    verfiyJwt,
    upload.fields([
        {
            name: "logo",
            maxCount: 1
        }
    ]),
    createProject
    )



projectRouter.route("/addJoinReq").post(
    verfiyJwt,
    addJoinReq)

projectRouter.route("/updateJoinReq").patch(
    verfiyJwt,
    updateJoinReq)

projectRouter.route("/update").patch(
    verfiyJwt,
    updateProject,
)    

projectRouter.route("/q/").get(getAllProjects)

projectRouter.route("/getJoinReqs/:projectId").get(
    verfiyJwt,
    getAllJoinReqs)

    projectRouter.route("/:projectId").get(getProjectDetails)



export {projectRouter}