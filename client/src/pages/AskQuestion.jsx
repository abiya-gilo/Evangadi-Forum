import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import styles from "./AskQuestion.module.css";
import { FaArrowRight } from "react-icons/fa";

function AskQuestion() {
  const [questions, setQuestions] = useState([]);

  async function fetchQuestions() {
    try {
      const { data } = await axios.get("/questions");
      setQuestions(data.questions);
    } catch (error) {
      console.log("Error fetching questions:", error);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <h2>Questions</h2>

        <Link to="/post-question" className={styles.askBtn}>
          Ask Question
        </Link>
      </div>

      <div className={styles.list}>
        {questions.map((q) => (
          <Link
            key={q.questionid}
            to={`/questions/${q.questionid}`}
            className={styles.card}
          >
            <div className={styles.left}>
              <img
                src="https://i.pravatar.cc/50"
                alt="avatar"
                className={styles.avatar}
              />
              <div>
                <h3>{q.title}</h3>
                <p className={styles.username}>{q.username}</p>
              </div>
            </div>

            <FaArrowRight className={styles.arrow} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AskQuestion;
