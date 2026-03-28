import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = ({ socket, setSocket, isWaiting, setIsWaiting, setUsername }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("play");
  const [history, setHistory] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setUsername(parsedUser.username);
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const serverUrl =
          import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${serverUrl}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const freshUser = await res.json();
          setUser(freshUser);
          localStorage.setItem("user", JSON.stringify(freshUser));
          setUsername(freshUser.username);
        }
      } catch (err) {
        console.error("Failed to fetch fresh profile data:", err);
      }
    };
    fetchProfile();
  }, [setUsername]);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "play") return;

      setLoadingData(true);
      const token = localStorage.getItem("token");
      const serverUrl =
        import.meta.env.VITE_SERVER_URL;

      try {
        if (activeTab === "history") {
          const res = await fetch(`${serverUrl}/api/users/matches`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setHistory(data);
          }
        } else if (activeTab === "submissions") {
          const res = await fetch(`${serverUrl}/api/users/submissions`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setSubmissions(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const connectSocket = () => {
    const serverUrl =
      import.meta.env.VITE_SERVER_URL;
    const token = localStorage.getItem("token");

    const newSocket = io.connect(serverUrl, {
      auth: { token },
    });
    setSocket(newSocket);
    setIsWaiting(true);

    newSocket.emit("join_queue");
  };

  const cancelMatchmaking = () => {
    setIsWaiting(false);

    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const renderTabContent = () => {
    if (loadingData) {
      return <div className={styles.dataSpinner}></div>;
    }

    if (activeTab === "play") {
      return (
        <>
          <h1 className={styles.title}>BracketBrawl</h1>
          {!isWaiting ? (
            <div className={styles.matchmakingBox}>
              <p className={styles.matchmakingText}>Ready to rumble?</p>
              <button onClick={connectSocket} className={styles.button}>
                Find Match
              </button>
            </div>
          ) : (
            <div className={styles.matchmakingBox}>
              <h2 className={styles.waitingText}>Waiting for opponent...</h2>
              <div className={styles.loader}></div>
              <button
                onClick={cancelMatchmaking}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          )}
        </>
      );
    }

    if (activeTab === "history") {
      if (history.length === 0) {
        return (
          <p className={styles.emptyState}>
            No matches found. Go play some games!
          </p>
        );
      }
      return (
        <div className={styles.listContainer}>
          {history.map((match, idx) => {
            const isWinner =
              match.winner?.username === user?.username ||
              match.winner?._id === user?._id;
            const isDraw = !match.winner;
            const playersList = match.users || [];
            const opponent =
              playersList.find(
                (p) => p._id !== user?._id && p.username !== user?.username,
              ) || {};

            return (
              <div key={idx} className={styles.listItem}>
                <div className={styles.listItemRow}>
                  <div className={styles.listItemCol}>
                    <span className={styles.listItemTitle}>
                      {match.problem?.title || "Unknown Problem"}
                    </span>
                    <span className={styles.listItemSub}>
                      vs. {opponent.username || "Unknown"} (
                      {opponent.rating || "N/A"})
                    </span>
                    {match.createdAt && (
                      <span className={styles.listItemDate}>
                        {new Date(match.createdAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div
                    className={`${styles.badge} ${isDraw ? styles.badgeNeutral : isWinner ? styles.badgeWin : styles.badgeLoss}`}
                  >
                    {isDraw ? "Draw" : isWinner ? "Victory" : "Defeat"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (activeTab === "submissions") {
      if (submissions.length === 0) {
        return <p className={styles.emptyState}>No submissions found yet.</p>;
      }
      return (
        <div className={styles.listContainer}>
          {submissions.map((sub, idx) => {
            const resultValue = sub.result || "Unknown";
            const isAccepted = resultValue === "Accepted";
            return (
              <div key={idx} className={styles.listItem}>
                <div className={styles.listItemRow}>
                  <div className={styles.listItemCol}>
                    <span className={styles.listItemTitle}>
                      {sub.problem?.title || "Unknown Problem"}
                    </span>
                    <span className={styles.listItemSub}>{sub.language}</span>
                    {sub.createdAt && (
                      <span className={styles.listItemDate}>
                        {new Date(sub.createdAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div
                    className={`${styles.badge} ${
                      isAccepted ? styles.badgeWin : styles.badgeLoss
                    }`}
                  >
                    {resultValue}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.leftColumn}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarPlaceholder}>
                {user?.username ? user.username.charAt(0).toUpperCase() : "?"}
              </div>
              <h2 className={styles.profileUsername}>
                {user?.username || "Guest"}
              </h2>
              <span className={styles.profileEmail}>{user?.email}</span>
            </div>

            <div className={styles.statsContainer}>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>Rating</span>
                <span className={styles.statValue}>{user?.rating || 1200}</span>
              </div>
            </div>

            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.tabsContainer}>
              <button
                className={`${styles.tab} ${activeTab === "play" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("play")}
              >
                Play
              </button>
              <button
                className={`${styles.tab} ${activeTab === "history" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("history")}
              >
                Match History
              </button>
              <button
                className={`${styles.tab} ${activeTab === "submissions" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("submissions")}
              >
                Submissions
              </button>
            </div>

            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
