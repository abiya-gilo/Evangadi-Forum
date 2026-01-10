import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../axiosConfig";
import styles from "./PostQuestion.module.css";

function PostQuestion() {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!title.trim() || !description.trim()) {
      setMsg({ type: "error", text: "Please fill out all fields." });
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post("/questions", {
        title,
        description,
        userId: user?.userid, // adjust based on your backend
      });

      setMsg({ type: "success", text: "Question posted successfully!" });
      setTitle("");
      setDescription("");
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong.";

      setMsg({ type: "error", text: serverMessage });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.wrapper}>
      <h1>Ask a Question</h1>
      <p className={styles.subtitle}>
        Stuck on something? Ask the community for help.
      </p>

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
        <label>Question Title</label>
        <input
          type="text"
          placeholder="Enter a short title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Details</label>
        <textarea
          placeholder="Describe your question in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Question"}
        </button>
      </form>
    </section>
  );
}

export default PostQuestion;
