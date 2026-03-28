const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { joinRoom, disconnect } = require("./socket/roomManager");
const { submitCode } = require("./socket/gameManager");
const socketAuthMiddleware = require("./socket/socketAuth");

require("dotenv").config();
const connectDB = require("./configs/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.username} (Socket: ${socket.id})`);

  socket.on("join_queue", async (data) => {
    await joinRoom(io, socket, data);
  });

  socket.on("submit_code", (data) => {
    submitCode(io, socket, data);
  });

  socket.on("disconnecting", () => {
    disconnect(io, socket);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
