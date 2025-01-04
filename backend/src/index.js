
import 'dotenv/config'
import connectDB from "./db/index.js";
import { app } from './app.js';
import http from "http";
import { Server } from 'socket.io';

import '../ws/index.js'



connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{

        console.log(` Server is running at port : ${process.env.PORT}`);
    
    })

   

 





   
}
     
)

