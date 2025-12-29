const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { joinRoom, disconnect } = require("./socket/roomManager");
const { submitCode } = require("./socket/gameManager");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_queue", (data) => {
    joinRoom(io, socket, data);
  });

  socket.on("submit_code", (data) => {
    submitCode(io, socket, data);
  });

  socket.on("disconnecting", () => {
    disconnect(io, socket);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING ON 3001");
});
