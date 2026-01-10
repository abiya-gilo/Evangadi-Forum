import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.centerBox}>
        <h1>Welcome to Evangadi Forum</h1>
        <p>
          A community where learners help each other grow. Ask questions, share
          answers, and build real-world experience together.
        </p>

        <div className={styles.buttons}>
          <Link to="/register" className={styles.joinBtn}>
            Join Now
          </Link>

          <Link to="/login" className={styles.signInBtn}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
