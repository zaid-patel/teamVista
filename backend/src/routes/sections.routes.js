import { Router } from "express";
import { verfiyJwt } from "../middlewares/auth.middleware.js";
import { addMembers, addSection,  getSection } from "../controllers/section.controller.js";


const sectionRouter=Router()

sectionRouter.use(verfiyJwt)




sectionRouter.route("/add").post(addSection)


sectionRouter.route("/addMembers").post(addMembers)

sectionRouter.route("/:sectionId").get(getSection)



export {sectionRouter}