import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))
app.use(express.json({limit:'16kb'}))
app.use(express.static('public'))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(cookieParser());


import { userRouter } from './routes/user.routes.js'
import { projectRouter } from './routes/project.routes.js'
import { sectionRouter } from './routes/sections.routes.js'
import {router as ftrrouter} from './routes/feature.routes.js'
import issueRouter from './routes/issues.routes.js'
import { router as docrouter } from './routes/document.routes.js'
import { createClient } from 'redis'
import { Section } from './models/section.model.js'
import { Message } from './models/message.model.js'
import { Feature } from './models/feature.model.js'


app.use('/api/v1/users',userRouter)

app.use('/api/v1/projects',projectRouter)
app.use('/api/v1/sections',sectionRouter)

app.use('/api/v1/features',ftrrouter)

app.use('/api/v1/issues',issueRouter)
app.use('/api/v1/docs',docrouter)

const redisSubscriber = createClient ({
    url: "redis://localhost:6379", 
  });
  
  (async () => {
    // await redisPublisher.connect();
    await redisSubscriber.connect();
  
    // Subscribe to the Redis channel only once
    redisSubscriber.subscribe("all-messages", async(message, channel) => {
      console.log(`Received message z ${channel}: ${message}`);
  
      if (channel === "all-messages") {
        const parsedMessage = JSON.parse(message);
        const { chat, content } = parsedMessage;
  
        console.log(`Message received z ${chat}: ${content}`);
        if(!parsedMessage.chat || !parsedMessage.owner || !parsedMessage.content) {
            console.log(parsedMessage);
            return;
            
        }
        const section=await Section.findById(parsedMessage.chat)
        const feature=await Feature.findById(parsedMessage.chat)
        console.log("looo"+section+"q"+feature);
        
        if(section){
           await Message.create({
                owner:parsedMessage.ownerId,
                content:parsedMessage.content,
                section:parsedMessage.chat
            })
        }
        else if(feature){
            await Message.create({
                owner:parsedMessage.ownerId,
                content:parsedMessage.content,
                feature:parsedMessage.chat
            })
        }

  
        // Emit to the correct room based on chatId
        // console.log(io.sockets.adapter.rooms.get(chat));
        // io.in(chat).emit("message received", parsedMessage);
  
      }
    });
  })();
  







export {app}