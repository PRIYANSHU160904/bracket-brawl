const { rooms } = require("./roomManager");
const axios = require("axios");

const submitCode = async (io, socket, { code, roomId }) => {
  const room = rooms[roomId];
  if (!room || room.status !== "playing") return;
  console.log("is it even reaching here ??");

  const problem = room.problem;
  let passed = true;
  let outputLog = "";

  // Tell opponent I am running code
  socket.to(roomId).emit("opponent_status", { status: "Running Code..." });

  try {
    for (const test of problem.testCases) {
      const codeToRun = `${code}\nconsole.log(${test.input})`;

      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: "javascript",
          version: "18.15.0",
          files: [{ content: codeToRun }],
        }
      );

      const output = response.data.run.output
        ? response.data.run.output.trim()
        : "";
      const expected = test.output.replace(/'/g, "");

      console.log(output);

      if (output !== expected) {
        passed = false;
        outputLog += `Test Failed: ${test.input}\nExpected: ${expected}\nGot: ${output}\n\n`;
        break;
      } else {
        outputLog += `Test Passed: ${test.input}\n`;
      }
    }

    socket.emit("execution_result", { passed, output: outputLog });
    console.log("execution result sent!");

    if (passed) {
      io.to(roomId).emit("game_over", { winnerId: socket.id });
      room.status = "finished";

      delete room[roomId]; // delete room after declaring result
    } else {
      socket
        .to(roomId)
        .emit("opponent_status", { status: "Submission Failed" });
    }
  } catch (error) {
    console.error(error);
    socket.emit("execution_result", { passed: false, output: "Server Error" });
  }
};

module.exports = { submitCode };
