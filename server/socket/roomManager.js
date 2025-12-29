const rooms = {}; // Store room state: { roomId: { players: [], problem: {}, status: 'waiting' } }
const problems = require("../data/problems");

const joinRoom = (io, socket, { username }) => {
  // Find a room with 1 player, or create a new one
  let roomId = null;

  for (let id in rooms) {
    if (rooms[id].players.length === 1 && rooms[id].status === "waiting") {
      roomId = id;
      break;
    }
  }

  if (!roomId) {
    roomId = Math.random().toString(36).substring(7);
    // Pick a random problem for this room
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    rooms[roomId] = {
      players: [],
      problem: randomProblem,
      status: "waiting",
    };
  }

  const room = rooms[roomId];
  room.players.push({ id: socket.id, username });
  socket.join(roomId);

  // Notify the user they joined
  socket.emit("room_joined", { roomId, playerId: socket.id });

  // If 2 players, start game
  if (room.players.length === 2) {
    room.status = "playing";
    io.to(roomId).emit("game_start", {
      roomId: roomId,
      problem: room.problem,
      players: room.players,
    });
  } else {
    socket.emit("waiting_for_opponent");
  }
};

const disconnect = (io, socket) => {
  const roomId = Array.from(socket.rooms)[1];
  io.to(roomId).emit("opponent_disconnected");
  delete rooms[roomId];
};

module.exports = { joinRoom, rooms, disconnect };
