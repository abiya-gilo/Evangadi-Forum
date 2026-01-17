import { useEffect, useState, useContext } from "react";
import axiosBase from "../services/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { RxAvatar } from "react-icons/rx";
import { IoIosArrowDropright } from "react-icons/io";

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
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to load questions: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function load() {
      await fetchQuestions();
    }
    load();
  }, []);

  return (
    <div className={styles.container}>
      {/* Welcome */}
      <div className={styles.welcomeContainer}>
        <h2 className={styles.welcome}>Welcome: {user?.username}</h2>
      </div>

      {/* Ask Question */}

      <Link to="/AskQuestion" className={styles.askBtn}>
        Ask Question
      </Link>

      <h3 className={styles.heading}>Questions</h3>

      {error && <p className={styles.error}>{error}</p>}
      {loading && <p className={styles.loading}>Loading questions...</p>}

      {/* Questions List */}
      <div className={styles.list}>
        {questions.map((q) => (
          <Link
            key={q.questionid}
            to={`/questions/${q.questionid}`}
            className={styles.questionCard}
          >
            {/* LEFT: Avatar + Username */}
            <div className={styles.leftCol}>
              <div className={styles.avatarCircle}>
                <RxAvatar className={styles.avatarIcon} />
              </div>
              <div className={styles.username}>{q.username}</div>
            </div>

            {/* MIDDLE: Question Title */}
            <div className={styles.texts}>
              <p className={styles.title}>{q.title}</p>
            </div>

            {/* RIGHT: Arrow */}
            <IoIosArrowDropright className={styles.arrowIcon} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
