import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axiosConfig";
import { AuthContext } from "../context/AuthContext";
import styles from "./QuestionDetail.module.css";

function QuestionDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");

  async function fetchData() {
    try {
      const { data } = await axios.get(`/questions/${id}`);
      setQuestion(data.question);
      setAnswers(data.answers);
    } catch (error) {
      console.log("Error fetching question:", error);
    }
  }

  async function submitAnswer(e) {
    e.preventDefault();
    if (!answerText.trim()) return;

    try {
      await axios.post("/answers", {
        answer: answerText,
        questionId: id,
        userId: user?.userid,
      });

      setAnswerText("");
      fetchData(); // refresh answers
    } catch (error) {
      console.log("Error posting answer:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!question) return <p>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{question.title}</h2>
      <p className={styles.description}>{question.description}</p>

      <h3 className={styles.sectionTitle}>Answer From The Community</h3>

      <div className={styles.answers}>
        {answers.length === 0 && <p>No answers yet. Be the first!</p>}

        {answers.map((a) => (
          <div key={a.answerid} className={styles.answerCard}>
            <div className={styles.userInfo}>
              <img
                src="https://i.pravatar.cc/50"
                alt="avatar"
                className={styles.avatar}
              />
              <span className={styles.username}>{a.username}</span>
            </div>

            <p className={styles.answerText}>{a.answer}</p>
          </div>
        ))}
      </div>

      <h3 className={styles.sectionTitle}>Answer The Top Question</h3>

      <Link to="/ask-question" className={styles.backLink}>
        Go to Question page
      </Link>

      <form onSubmit={submitAnswer} className={styles.form}>
        <textarea
          placeholder="Your Answer..."
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        />

        <button type="submit" className={styles.submitBtn}>
          Post Your Answer
        </button>
      </form>
    </div>
  );
}

export default QuestionDetail;
