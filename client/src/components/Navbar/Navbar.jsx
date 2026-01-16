import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../context/AuthContext";
import headerLogo from "../../assets/Navbar.png";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img
            src={headerLogo}
            alt="Evangadi Header Logo"
            className={styles.logoImg}
          />
        </Link>

        {/* Navigation */}
        <nav className={styles.nav}>
          <Link to={user ? "/home" : "/"}>Home</Link>
          <Link to="/how-it-works">How it works</Link>

          {user ? (
            <button onClick={handleLogout} className={styles.authBtn}>
              LOG OUT
            </button>
          ) : (
            <Link to="/login" className={styles.authBtn}>
              SIGN IN
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
