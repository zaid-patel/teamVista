import { Router } from "express";
import { verfiyJwt } from "../middlewares/auth.middleware.js";
import { addAnIssueToProject, getAllIssuesForProject } from "../controllers/issue.controller.js";


const issueRouter=Router();


issueRouter.use(verfiyJwt);


issueRouter.route('/add').post(addAnIssueToProject)

issueRouter.route('/:projectId').get(getAllIssuesForProject)

export default issueRouter;

