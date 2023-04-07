// io is the method or a function that we just got, and is not internal and we got this from the library. of upper script.
// this is the initial connection , we make it and sends up it to the backent, it requests somethins, and gets up the back. 
let socket  = io();
// now we need to go back inside server.js and listen to the event.

socket.on("connect",() => {
    console.log("connected to server");

    // socket.emit('createMessage', {
    //     from: "pratham",
    //     text: "this is text send on emit"
    // })

})

socket.on("disconnect", () => {
    console.log("Disconnected from server");
})

socket.on("newMessage", (message) => {
    console.log("newMessage", message)
})

// when we use socket.on, we will be listening for an event.
// when we create an event , we will be using the (.emit) method.
// 

// socket is for singular user and io will broadcast it to everyboly that's available.



