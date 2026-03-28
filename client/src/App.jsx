import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Arena from "./pages/Arena/Arena";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Header from "./components/Header/Header";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [isInGame, setIsInGame] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!socket) return;

    const handleGameStart = (data) => {
      setGameData(data);
      setIsInGame(true);
      navigate("/arena");
    };

    socket.on("game_start", handleGameStart);

    return () => {
      socket.off("game_start", handleGameStart);
    };
  }, [socket, navigate]);

  return (
    <div className="app-container">
      {location.pathname !== "/arena" && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home
                socket={socket}
                setSocket={setSocket}
                isWaiting={isWaiting}
                setIsWaiting={setIsWaiting}
                username={username}
                setUsername={setUsername}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login onNavigate={(path) => navigate(`/${path}`)} />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup onNavigate={(path) => navigate(`/${path}`)} />
            </AuthRoute>
          }
        />
        <Route
          path="/arena"
          element={
            <ProtectedRoute>
              {isInGame && gameData ? (
                <Arena
                  gameData={gameData}
                  socket={socket}
                  setSocket={setSocket}
                  setIsInGame={(val) => {
                    setIsInGame(val);
                    if (!val) navigate("/");
                  }}
                  setIsWaiting={setIsWaiting}
                  username={username}
                />
              ) : (
                <Navigate to="/" replace />
              )}
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
