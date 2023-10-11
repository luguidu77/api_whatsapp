
const { Server } = require("socket.io");

const socket = io("http://127.0.0.1:3000");

socket.on("message", (data) => {
  console.log(data);
});
