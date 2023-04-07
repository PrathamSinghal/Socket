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

    socket.on('disconnect', () => {
        console.log("User was disconnected");
    })


})  // it starts lintening to the event,.... it is pre-built



app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
