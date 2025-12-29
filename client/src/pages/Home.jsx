import io from "socket.io-client";

const Home = ({
  setSocket,
  isWaiting,
  setIsWaiting,
  username,
  setUsername,
}) => {
  const connectSocket = () => {
    // const newSocket = io.connect("http://localhost:3001");
    const newSocket = io.connect("https://ce72760dc9bf.ngrok-free.app");
    setSocket(newSocket);
    setIsWaiting(true);

    newSocket.emit("join_queue", { username });
  };

  return (
    <div
      className="home-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0f0f0f",
        color: "white",
      }}
    >
      <h1>BracketBrawl</h1>
      {!isWaiting ? (
        <>
          <input
            placeholder="Enter Nickname"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={(e) => e.key === "Enter" && connectSocket()}
            style={{ padding: "10px", fontSize: "16px", marginBottom: "10px" }}
          />
          <button
            onClick={connectSocket}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              backgroundColor: "#2ed573",
              border: "none",
              cursor: "pointer",
            }}
          >
            Find Match
          </button>
        </>
      ) : (
        <h2>Waiting for opponent...</h2>
      )}
    </div>
  );
};

export default Home;
