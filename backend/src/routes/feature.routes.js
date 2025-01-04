import { Router } from "express";
import { verfiyJwt } from "../middlewares/auth.middleware.js";
import { createFeature,getFeatureById,updateFeature,listFeatures,markFeatureAsCompleted } from "../controllers/feature.controller.js";

import { upload } from "../middlewares/multer.js";

const router = Router();
router.use(verfiyJwt)


router.post('/', 
    upload.fields([
        {
            name: "resources",
            maxCount: 1
        }
    ]),
    createFeature);
router.get('/:id', getFeatureById);
router.put('/:id', updateFeature);
router.get('/:sectionId', listFeatures);
router.patch('/features/:id/complete', markFeatureAsCompleted);


export {
    router
};