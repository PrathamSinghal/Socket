const path = require('path');
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
// socket io doesn't work with app.listen , we have to create our own server so that we could use socket io inside the server.
//  to do this, add anopther built in module called http. 

const publicPath = path.join(__dirname,"/../public");
const port = process.env.PORT || 3000;
var app = express();
let server = http.createServer(app);
let io = socketIO(server); // adding this to the server gives access to socket io library.  
// we need to create ascript inside the html so that we can passit in this library.
// this script allow us to make connection to the backend so that backend can accept those connections.


io.on("connection",(socket) => {
    console.log("A new user just connected.");
    
    // now when somebody new is connected we are gonna send everybody else who is connected that this person is arrived.
    // but new user should get that welcome to the chat from admin.
    socket.emit("newMessage", {
        from: "Admin",
        text: "Welcome to the chat app!",
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit("newMessage", {
        from: "Admin",
        text: "New user Joined!",
        createdAt: new Date().getTime()
    })


    socket.on("createMessage", (message) => {
        console.log("Create Message", message);




        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

        // this broadcast to  everyone, even itself
        // right now the message is getting to even to the person who sent.

        // // now we broadcast to a single socket
        // // this broadcast to everyone else except to the person who sent the message.
        
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

    })

    socket.on('disconnect', () => {
        console.log("User was disconnected");
    })

    // socket.emit('newMessage', {
    //     from: "Pratham Singh",
    //     text: "This is sad",
    // })

    


})  // it starts lintening to the event,.... it is pre-built



app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
