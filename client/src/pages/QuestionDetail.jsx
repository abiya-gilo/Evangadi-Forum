import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosBase from "../services/axiosConfig";
import styles from "./QuestionDetail.module.css";

function QuestionDetail() {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");

  const fetchData = async () => {
    try {
      const questionRes = await axiosBase.get(`/questions/${id}`);
      setQuestion(questionRes.data);

      const answersRes = await axiosBase.get(`/answers/${id}`);
      setAnswers(answersRes.data);
    } catch (error) {
      console.log("Error fetching question:", error);
    }
  };

  const submitAnswer = async (e) => {
    e.preventDefault();
    if (!answerText.trim()) return;

    try {
      await axiosBase.post("/answers/add", {
        questionid: id,
        answer_text: answerText,
      });

      setAnswerText("");
      fetchData();
    } catch (error) {
      console.log("Error posting answer:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchData();
  }, [id]);

  if (!question) return <p>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{question.title}</h2>
      <p className={styles.description}>{question.description}</p>

      <h3 className={styles.sectionTitle}>Answers From The Community</h3>

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

            <p className={styles.answerText}>{a.answer_text}</p>
          </div>
        ))}
      </div>

      <h3 className={styles.sectionTitle}>Answer This Question</h3>

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

      <Link to="/home" className={styles.backLink}>
        Back to Question List
      </Link>
    </div>
  );
}

export default QuestionDetail;
