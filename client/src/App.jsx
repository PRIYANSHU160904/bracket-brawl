import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Arena from "./pages/Arena";

function App() {
  const [isInGame, setIsInGame] = useState(false);
  const [gameData, setGameData] = useState(null); // { roomId, problem, ... }
  const [socket, setSocket] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (socket) {
      socket.on("game_start", (data) => {
        setGameData(data); // data contains problem and players
        setIsInGame(true);
      });
    }
  });

  return (
    <div className="app-container">
      {!isInGame ? (
        <Home
          setSocket={setSocket}
          isWaiting={isWaiting}
          setIsWaiting={setIsWaiting}
          username={username}
          setUsername={setUsername}
        />
      ) : (
        <Arena
          gameData={gameData}
          socket={socket}
          setSocket={setSocket}
          setIsInGame={setIsInGame}
          setIsWaiting={setIsWaiting}
          username={username}
        />
      )}
    </div>
  );
}

export default App;
