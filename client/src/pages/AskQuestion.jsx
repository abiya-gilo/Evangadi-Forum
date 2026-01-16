import { useState } from "react";
import { Link } from "react-router-dom";
import axiosBase from "../services/axiosConfig";
import styles from "./AskQuestion.module.css";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!title.trim() || !description.trim()) {
      setMsg({ type: "error", text: "Please fill out all fields." });
      return;
    }

    try {
      await axiosBase.post("/questions/ask", {
        title,
        description,
      });

      setMsg({ type: "success", text: "Question posted successfully!" });
      setTitle("");
      setDescription("");
    } catch (error) {
      const serverMessage =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something went wrong.";

      setMsg({ type: "error", text: serverMessage });
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* Steps Section */}
      <div className={styles.stepsBox}>
        <h2 className={styles.stepsTitle}>Steps to write a good question</h2>
        <ul className={styles.stepsList}>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>

      {/* Ask Question Section */}
      <div className={styles.askBox}>
        <h2 className={styles.askTitle}>Ask a public question</h2>
        <Link to="/questions" className={styles.questionLink}>
          Go to Question page
        </Link>

        {msg.text && (
          <div
            className={`${styles.msg} ${
              msg.type === "error" ? styles.error : styles.success
            }`}
          >
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />

          <textarea
            placeholder="Question Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />

          <button type="submit" className={styles.postBtn}>
            Post Your Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
