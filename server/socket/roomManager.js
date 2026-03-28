const rooms = {}; 
let matchmakingQueue = []; 

const Problem = require("../models/Problem");
const Match = require("../models/Match");
const User = require("../models/User");
const calculateElo = require("../utils/eloCalculator");

const joinRoom = async (io, socket) => {
  const username = socket.user.username;
  const userId = socket.user._id.toString();

  if (matchmakingQueue.some((p) => p.userId === userId)) {
    socket.emit("error", {
      message: "You are already in the matchmaking queue.",
    });
    return;
  }

  const alreadyInRoom = Object.values(rooms).some((room) =>
    room.players.some((p) => p.userId === userId),
  );
  if (alreadyInRoom) {
    socket.emit("error", { message: "You are already in a match." });
    return;
  }

  matchmakingQueue.push({ id: socket.id, userId, username, socket });
  socket.emit("waiting_for_opponent");

  if (matchmakingQueue.length >= 2) {
    
    const player1 = matchmakingQueue.shift();
    const player2 = matchmakingQueue.shift();

    const roomId = Math.random().toString(36).substring(7);

    player1.socket.join(roomId);
    player2.socket.join(roomId);

    io.to(roomId).emit("room_joined", { roomId });

    try {
      
      const randomProblems = await Problem.aggregate([
        { $sample: { size: 1 } },
      ]);
      const randomProblem =
        randomProblems.length > 0 ? randomProblems[0] : null;

      const matchDoc = await Match.create({
        users: [player1.userId, player2.userId],
        problem: randomProblem._id,
        status: "ongoing",
      });

      rooms[roomId] = {
        roomId,
        matchId: matchDoc._id,
        players: [
          {
            id: player1.id,
            userId: player1.userId,
            username: player1.username,
          },
          {
            id: player2.id,
            userId: player2.userId,
            username: player2.username,
          },
        ],
        problem: randomProblem,
        status: "playing",
      };

      const { hiddenTestCases, ...sanitizedProblem } = randomProblem;

      io.to(roomId).emit("game_start", {
        roomId: roomId,
        matchId: matchDoc._id,
        problem: sanitizedProblem,
        players: rooms[roomId].players,
      });
    } catch (err) {
      console.error("Error setting up match:", err);
      io.to(roomId).emit("error", { message: "Failed to initialize match" });
    }
  }
};

const disconnect = async (io, socket) => {
  
  matchmakingQueue = matchmakingQueue.filter((p) => p.id !== socket.id);

  let activeRoomId = null;
  for (let id in rooms) {
    if (rooms[id].players.some((p) => p.id === socket.id)) {
      activeRoomId = id;
      break;
    }
  }

  if (activeRoomId) {
    const room = rooms[activeRoomId];
    io.to(activeRoomId).emit("opponent_disconnected");

    const winner = room.players.find((p) => p.id !== socket.id);
    const loser = room.players.find((p) => p.id === socket.id);

    let statChanges = {};

    try {
      
      if (room.matchId && winner && loser) {
        
        const winnerDoc = await User.findById(winner.userId);
        const loserDoc = await User.findById(loser.userId);

        if (winnerDoc && loserDoc) {
          const elo = calculateElo(winnerDoc.rating, loserDoc.rating);
          winnerDoc.rating = elo.newWinnerRating;
          loserDoc.rating = elo.newLoserRating;
          await Promise.all([winnerDoc.save(), loserDoc.save()]);

          statChanges = {
            winnerId: winnerDoc._id.toString(),
            winnerNewRating: elo.newWinnerRating,
            winnerDiff: elo.winnerRatingChange,
            loserId: loserDoc._id.toString(),
            loserNewRating: elo.newLoserRating,
            loserDiff: elo.loserRatingChange,
          };
        }

        await Match.findByIdAndUpdate(room.matchId, {
          status: "aborted", 
          winner: winner.userId,
        });

        await User.updateMany(
          { _id: { $in: [room.players[0].userId, room.players[1].userId] } },
          { $push: { matches: room.matchId } },
        );
      }
    } catch (err) {
      console.error("Error updating aborted match:", err);
    }

    io.to(activeRoomId).emit("opponent_disconnected", { stats: statChanges });

    delete rooms[activeRoomId];
  }
};

module.exports = { joinRoom, rooms, disconnect };
