import { Router } from "express";
import { verfiyJwt } from "../middlewares/auth.middleware.js";
import { createMessage, getMessagesByChat } from "../controllers/message.controller.js";


const router=Router()


router.use(verfiyJwt);


router.route('/message').post(createMessage)

router.route('/:chatId').get(getMessagesByChat)


export default router;