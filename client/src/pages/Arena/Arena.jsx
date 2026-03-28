import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import io from "socket.io-client";
import Split from "react-split";
import languageTemplates from "../../templates/langugageTemplates";
import styles from "./Arena.module.css";

const Arena = ({
  gameData,
  socket,
  setSocket,
  setIsInGame,
  setIsWaiting,
  username,
}) => {
  const { problem, players } = gameData;
  const [code, setCode] = useState({
    language: "c++",
    code: languageTemplates["c++"],
  });
  const [output, setOutput] = useState("");
  const [opponentStatus, setOpponentStatus] = useState("Thinking...");
  const [gameResult, setGameResult] = useState(null);
  const [gameStats, setGameStats] = useState(null);
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
      if (data.stats) setGameStats(data.stats);
    });

    socket.on("opponent_disconnected", (data) => {
      setGameResult((prevState) => {
        if (!prevState) return "OPPONENT DISCONNECTED";
        return prevState;
      });
      if (data?.stats) setGameStats(data.stats);
    });

    return () => {
      socket.off("opponent_status");
      socket.off("execution_result");
      socket.off("game_over");
      socket.off("opponent_disconnected");
    };
  }, [socket]);

  const submitCode = () => {
    socket.emit("submit_code", { code, roomId: gameData.roomId });
    setIsSubmitting(true);
  };

  const findNewMatch = () => {
    setGameResult(null);
    setGameStats(null);
    socket.disconnect();
    const serverUrl =
      import.meta.env.VITE_SERVER_URL;
    const token = localStorage.getItem("token");

    const newSocket = io.connect(serverUrl, {
      auth: { token },
    });

    setSocket(newSocket);
    newSocket.on("connect", () => {
      newSocket.emit("join_queue");
    });
    setIsWaiting(true);
    setIsInGame(false);
  };

  const gotoHomepage = () => {
    setGameResult(null);
    setGameStats(null);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    setIsWaiting(false);
    setIsInGame(false);
  };

  const opponentIndex = players.findIndex((player) => player.id !== socket.id);
  const opponentUsername =
    opponentIndex !== -1 ? players[opponentIndex].username : "Unknown";

  const getStatusColor = (status) => {
    switch (status) {
      case "Thinking...":
        return "#f39c12";
      case "Submitting":
      case "Testing":
        return "#3498db";
      case "Finished":
        return "#2ed573";
      default:
        return "#f39c12";
    }
  };

  if (gameResult) {
    let ratingDisplay = null;
    if (gameStats) {
      const isWinnerStats =
        gameResult === "VICTORY" || gameResult === "OPPONENT DISCONNECTED";
      const userStats = isWinnerStats
        ? { newRating: gameStats.winnerNewRating, diff: gameStats.winnerDiff }
        : { newRating: gameStats.loserNewRating, diff: gameStats.loserDiff };

      ratingDisplay = (
        <div className={styles.ratingChangeContainer}>
          <span className={styles.ratingNumber}>{userStats.newRating}</span>
          <span
            className={
              userStats.diff >= 0
                ? styles.ratingDiffPositive
                : styles.ratingDiffNegative
            }
          >
            {userStats.diff >= 0 ? `+${userStats.diff}` : userStats.diff}
          </span>
        </div>
      );
    }

    return (
      <div className={styles.gameResultContainer}>
        <h1>{gameResult}</h1>
        {ratingDisplay}
        <div className={styles.resultActions}>
          <button className={styles.findMatchBtn} onClick={findNewMatch}>
            Find New Match
          </button>
          <button className={styles.goHomeBtn} onClick={gotoHomepage}>
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.arenaContainer}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <span className={styles.logo}>BracketBrawl</span>
          <span className={styles.username}>{username}</span>
        </div>

        <div className={styles.opponentStatusContainer}>
          <span className={styles.opponentLabel}>VS.</span>
          <span className={styles.opponentName}>{opponentUsername}</span>
          <span
            className={styles.statusDot}
            style={{ backgroundColor: getStatusColor(opponentStatus) }}
          />
          <span className={styles.statusText}>{opponentStatus}</span>
        </div>

        <div className={styles.controls}>
          <select
            value={code.language}
            onChange={(e) => {
              const newLang = e.target.value;

              setCode({
                language: newLang,
                code: languageTemplates[newLang],
              });
            }}
            className={styles.languageSelect}
          >
            <option value="c">C</option>
            <option value="c++">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button
            onClick={submitCode}
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </div>

      <Split
        className={styles.mainSplit}
        sizes={[50, 50]}
        minSize={300}
        expandToMin={false}
        gutterSize={6}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className={styles.problemPane}>
          <h2 className={styles.problemTitle}>{problem.title}</h2>
          <p className={styles.problemDescription}>
            {problem.description.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <hr className={styles.divider} />
          <h3 className={styles.examplesTitle}>Examples:</h3>
          {problem.sampleTestCases.map((tc, i) => (
            <div key={i} className={styles.exampleContainer}>
              <p className={styles.exampleLabel}>Example {i + 1}:</p>
              <div className={styles.exampleBox}>
                <div className={styles.ioBlock}>
                  <strong className={styles.ioLabel}>Input:</strong>
                  <div className={styles.ioContent}>{tc.input}</div>
                </div>
                <div>
                  <strong className={styles.ioLabel}>Output:</strong>
                  <div className={styles.ioContent}>{tc.output}</div>
                </div>
              </div>
              {tc.explanation && (
                <p className={styles.explanation}>
                  <strong>Explanation:</strong> {tc.explanation}
                </p>
              )}
            </div>
          ))}

          {problem.constraints && (
            <>
              <hr className={styles.divider} />
              <h3 className={styles.examplesTitle}>Constraints:</h3>
              <ul className={styles.constraintsList}>
                {problem.constraints.split("\n").map((line, index) => (
                  <li key={index} className={styles.constraintItem}>
                    <code>{line}</code>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className={styles.editorTerminalSplit}>
          <div className={styles.editorPane}>
            <Editor
              height="100%"
              language={code.language === "c++" ? "cpp" : code.language}
              theme="vs-dark"
              value={code.code}
              onChange={(val) => setCode({ ...code, code: val })}
              options={{ minimap: { enabled: false }, fontSize: 16 }}
            />
          </div>
          <div className={styles.terminalPane}>
            // TERMINAL
            <pre>{output}</pre>
          </div>
        </div>
      </Split>
    </div>
  );
};

export default Arena;
