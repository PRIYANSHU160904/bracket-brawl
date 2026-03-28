const { rooms } = require("./roomManager");
const axios = require("axios");
const Submission = require("../models/Submission");
const Match = require("../models/Match");
const User = require("../models/User");
const calculateElo = require("../utils/eloCalculator");
const submitCode = async (io, socket, { code, roomId }) => {
  const room = rooms[roomId];
  if (!room || room.status !== "playing") return;

  if (!room.evaluationLock) {
    room.evaluationLock = Promise.resolve();
  }

  socket.to(roomId).emit("opponent_status", { status: "Running Code..." });

  room.evaluationLock = room.evaluationLock.then(async () => {
    if (room.status !== "playing") {
      socket.emit("execution_result", {
        passed: false,
        output: "Match ended. Opponent's queued submission was successful.",
      });
      return;
    }

    const problem = room.problem;
    let passed = true;
    let outputLog = "";

    try {
      for (const test of problem.hiddenTestCases) {
        const codeToRun = code.code;
        const executionUrl =
          process.env.EXECUTION_API_URL ||
          "http://localhost:2000/api/v2/execute";

        const response = await axios.post(executionUrl, {
          language: code.language,
          version: "*",
          files: [{ content: codeToRun }],
          stdin: test.input,
        });

        if (!response.data || !response.data.run) {
          socket.emit("execution_result", {
            passed: false,
            output: "Code execution service returned an invalid response",
          });
          return;
        }

        const output = response.data.run.output
          ? response.data.run.output.trim()
          : "";
        const expected = test.output.replace(/'/g, "");

        console.log(output);

        if (output !== expected) {
          passed = false;

          if (response.data.run.stderr || response.data.run.code !== 0) {
            outputLog += `Runtime / Compilation Error:\n${output}\n`;
          } else {
            outputLog += `Wrong answer on a hidden testcase.\n`;
          }
          break;
        } else {
          outputLog += `Hidden Test Passed.\n`;
        }
      }

      socket.emit("execution_result", { passed, output: outputLog });
      console.log("execution result sent!");

      if (passed) {
        room.status = "finished";
      }

      try {
        const submission = await Submission.create({
          user: socket.user._id,
          problem: problem._id,
          code: code.code,
          language: code.language,
          result: passed ? "Accepted" : "Wrong Answer",
        });

        await socket.user.updateOne({ $push: { submissions: submission._id } });

        if (room.matchId) {
          await Match.findByIdAndUpdate(room.matchId, {
            $push: { submissions: submission._id },
          });
        }
      } catch (err) {
        console.error("Failed to save submission:", err);
      }

      if (passed) {
        const winnerIdStr = socket.user._id.toString();
        const winnerPlayer = room.players.find(
          (p) => p.userId === winnerIdStr,
        ) || { userId: winnerIdStr };
        const loserPlayer = room.players.find((p) => p.userId !== winnerIdStr);

        let statChanges = {};

        if (loserPlayer) {
          try {
            const winnerDoc = await User.findById(winnerPlayer.userId);
            const loserDoc = await User.findById(loserPlayer.userId);

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
          } catch (err) {
            console.error("Elo update error:", err);
          }
        }

        io.to(roomId).emit("game_over", {
          winnerId: socket.id,
          winnerName: socket.user.username,
          stats: statChanges,
        });

        if (room.matchId) {
          try {
            await Match.findByIdAndUpdate(room.matchId, {
              status: "completed",
              winner: socket.user._id,
            });

            await User.updateMany(
              {
                _id: { $in: [room.players[0].userId, room.players[1].userId] },
              },
              { $push: { matches: room.matchId } },
            );
          } catch (err) {
            console.error("Match saving error:", err);
          }
        }

        delete rooms[roomId];
      } else {
        socket
          .to(roomId)
          .emit("opponent_status", { status: "Submission Failed" });
      }
    } catch (error) {
      console.error(error);
      socket.emit("execution_result", {
        passed: false,
        output: "Server Error",
      });
    }
  });
};

module.exports = { submitCode };
