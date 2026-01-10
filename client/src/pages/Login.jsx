import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import styles from "./Login.module.css";
import { AuthContext } from "../context/AuthContext";
import bg from "../assets/landing-bg.png";


function Login() {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    const emailValue = emailDom.current?.value || "";
    const passValue = passwordDom.current?.value || "";

    if (!emailValue.trim() || !passValue.trim()) {
      setMsg({
        type: "error",
        text: "Please provide all required information.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });

      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      setMsg({ type: "success", text: "Login successful!" });
      setTimeout(() => navigate("/home"), 500);
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";

      setMsg({ type: "error", text: serverMessage });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={styles.bg} style={{ backgroundImage: `url(${bg})` }}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2>Login</h2>

        {msg.text && (
          <div
            className={`${styles.msg} ${
              msg.type === "error" ? styles.error : styles.success
            }`}
          >
            {msg.text}
          </div>
        )}

        <div>
          <span>Email</span>
          <input
            ref={emailDom}
            type="email"
            placeholder="email"
            className={styles.input}
            required
          />
        </div>

        <div>
          <span>Password</span>
          <input
            ref={passwordDom}
            type="password"
            placeholder="password"
            className={styles.input}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in…" : "Login"}
        </button>

        <p style={{ marginTop: "1rem" }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
