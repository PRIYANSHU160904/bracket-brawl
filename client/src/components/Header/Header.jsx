import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        BracketBrawl
      </Link>
      <nav className={styles.nav}>
        {token ? (
          <button onClick={handleLogout} className={styles.navLink}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
            <Link to="/signup" className={styles.navLinkPrimary}>
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
