// import { io } from "../src";

import { Server } from "socket.io";
import http from "http"
import { createClient } from "redis";


const socketServer = http.createServer();
const io = new Server(socketServer, {
pingTimeout: 60000,
cors: {
  origin: "*",  
},
});
// const client


const redisPublisher = createClient({
  url: "redis://localhost:6379", 
});
const redisSubscriber = createClient({
  url: "redis://localhost:6379", 
});

(async () => {
  await redisPublisher.connect();
  await redisSubscriber.connect();

  // Subscribe to the Redis channel only once
  redisSubscriber.subscribe("all-messages", (message, channel) => {
    console.log(`Received message on channel ${channel}: ${message}`);

    if (channel === "all-messages") {
      const parsedMessage = JSON.parse(message);
      const { chat, content } = parsedMessage;

      console.log(`Message received for chatId ${chat}: ${content}`);

      // Emit to the correct room based on chatId
      console.log(io.sockets.adapter.rooms.get(chat));
      io.in(chat).emit("message received", parsedMessage);

    }
  });
})();


const socketPort = process.env.SOCKET_PORT || 5010; 
socketServer.listen(socketPort, () => {
  console.log(`Socket.IO server is running on port: ${socketPort}`);
});



// redisSubscriber.on("all-messages",(message)=>{
//   console.log(message);
  
// })

// console.log(io);


  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (_id) => {
      socket.join(_id);
      console.log("from socketio setup:"+_id);
      
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log(room);
      
      // console.log("from socketio join chat:"+socket.in(room));
      
      console.log("User Joined Room: " + room);
    });


    
  
    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
      
        // if (!chat?.users) return console.log("chat.users not defined");
      
        const room = chat; // Use the chat's unique ID as the room identifier
        console.log(newMessageRecieved);
        
      
        redisPublisher.publish("all-messages", JSON.stringify(newMessageRecieved));

        // io.to(newMessageRecieved.chat).emit('message', {
        //   chat: newMessageRecieved.chat,
        //   owner: newMessageRecieved.owner,
        //   content: newMessageRecieved.content,
        // });
      });

      // redisSubscriber.on("all-messages", (channel, message) => {
       
      // });
      // redisSubscriber.subscribe("all-messages", (message,channel) => {
      //   console.log(`Received message: ${channel}`);
      //   // console.log("11111:"+channel);
        
      //   if (channel === "all-messages") {
      //     const parsedMessage = JSON.parse(message);
      //     console.log(message);
          
      //     const { chat, content } = parsedMessage;
    
      //     console.log(`Message received for chatId ${chat}: ${content}`);
      //     console.log(io.sockets.adapter.rooms.get(chat));
          
      //     io.to(chat).emit("message recieved", parsedMessage);
      //   }
      // });

      
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData);
    });
  });