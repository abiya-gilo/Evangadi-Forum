import { useState, useContext } from "react";
import axiosBase from "../services/axiosConfig";
import { AuthContext } from "../context/AuthContext";
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

      await axiosBase.post("/questions/ask", {
        title,
        description,
        userid: user?.userid,
      });

      setMsg({ type: "success", text: "Question posted successfully!" });
      setTitle("");
      setDescription("");
    } catch (error) {
      const serverMessage =
        error?.response?.data?.msg ||
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
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Posting…" : "Post Question"}
        </button>
      </form>
    </section>
  );
}

export default PostQuestion;
