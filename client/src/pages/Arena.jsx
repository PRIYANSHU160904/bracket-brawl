import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import io from "socket.io-client";

const Arena = ({
  gameData,
  socket,
  setSocket,
  setIsInGame,
  setIsWaiting,
  username,
}) => {
  const { problem, players } = gameData;
  const [code, setCode] = useState(problem.template);
  const [output, setOutput] = useState("");
  const [opponentStatus, setOpponentStatus] = useState("Thinking...");
  const [gameResult, setGameResult] = useState(null); // 'WON' or 'LOST' or 'OPPONENT_DISCONNECTED'
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    socket.on("opponent_status", (data) => {
      setOpponentStatus(data.status);
    });

    socket.on("execution_result", (data) => {
      setOutput(data.output);
      setIsSubmitting(false);
    });

    socket.on("game_over", (data) => {
      if (data.winnerId === socket.id) {
        setGameResult("VICTORY");
      } else {
        setGameResult("DEFEAT");
      }
    });

    socket.on("opponent_disconnected", () => {
      setGameResult((prevState) => {
        if (!prevState) return "OPPONENT DISCONNECTED";
        return prevState;
      });
    });

    return () => {
      socket.off("opponent_status");
      socket.off("execution_result");
      socket.off("game_over");
    };
  }, [socket]);

  const submitCode = () => {
    socket.emit("submit_code", { code, roomId: gameData.roomId });
    setIsSubmitting(true);
  };

  const findNewMatch = () => {
    setGameResult(null);
    socket.disconnect();
    const newSocket = io.connect("https://ce72760dc9bf.ngrok-free.app");
    setSocket(newSocket);
    newSocket.emit("join_queue", { username });
    setIsWaiting(true);
    setIsInGame(false);
  };

  const opponentIndex = players.findIndex((player) => player.id !== socket.id);
  const opponentUsername = players[opponentIndex].username;

  if (gameResult) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#0f0f0f",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>{gameResult}</h1>
        <button
          onClick={findNewMatch}
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          Find New Match
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1e1e1e",
        color: "white",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "10px",
          backgroundColor: "#2d2d2d",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>BracketBrawl: {username}</span>
        <span>
          Opponent ({opponentUsername}): {opponentStatus}
        </span>
        <button
          onClick={submitCode}
          disabled={isSubmitting}
          style={{
            backgroundColor: "#2ed573",
            border: "none",
            padding: "5px 15px",
            cursor: "pointer",
          }}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </div>

      {/* MAIN SPLIT */}
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* LEFT: PROBLEM */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            borderRight: "1px solid #444",
            overflowY: "auto",
          }}
        >
          <h2>{problem.title}</h2>
          <p>{problem.description}</p>
          <hr style={{ borderColor: "#444" }} />
          <h3>Examples:</h3>
          {problem.testCases.slice(0, 2).map((tc, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#333",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <code>Input: {tc.input}</code>
              <br />
              <code>Output: {tc.output}</code>
            </div>
          ))}
        </div>

        {/* RIGHT: EDITOR + TERMINAL */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 2 }}>
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val)}
              options={{ minimap: { enabled: false }, fontSize: 16 }}
            />
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#0f0f0f",
              borderTop: "1px solid #444",
              padding: "10px",
              overflowY: "scroll",
              fontFamily: "monospace",
            }}
          >
            <div style={{ color: "#888", marginBottom: "5px" }}>
              TERMINAL //
            </div>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arena;
