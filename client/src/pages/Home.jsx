import { useEffect, useState, useContext } from "react";
import axiosBase from "../services/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { RxAvatar } from "react-icons/rx";

function Home() {
  const { user } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchQuestions() {
    try {
      setLoading(true);
      setError("");
      const { data } = await axiosBase.get("/questions");
      console.log("Questions fetched:", data);
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to load questions: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.welcomeContainer}>
        <h2 className={styles.welcome}>Welcome: {user?.username}</h2>
      </div>

      <button>
        <Link to="/AskQuestion" className={styles.askBtn}>
          Ask Question
        </Link>
      </button>

      <h3 className={styles.heading}>Questions</h3>

      {error && <p className={styles.error}>{error}</p>}
      {loading && <p className={styles.loading}>Loading questions...</p>}

      <div className={styles.list}>
        {questions.map((q) => (
          <Link
            key={q.questionid}
            to={`/questions/${q.questionid}`}
            className={styles.questionCard}
          >
            <div>

              
            </div>

            <div className={styles.leftCol}>
              <div className={styles.userIcon}>
                {q.avatarUrl ? (
                  <img src={q.avatarUrl} alt={q.username} />
                ) : (
                  <span className={styles.initial}>
                    {q.username.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className={styles.username}>{q.username}</div>
            </div>

            <div className={styles.texts}>
              <p className={styles.title}>{q.title}</p>
            </div>

            <div className={styles.arrow} aria-hidden>
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M9.29 6.71a1 1 0 0 0 0 1.41L13.17 12l-3.88 3.88a1 1 0 1 0 1.41 1.41l4.59-4.59a1 1 0 0 0 0-1.41L10.7 6.7a1 1 0 0 0-1.41 0z"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
