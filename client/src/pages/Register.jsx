import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosBase from "../services/axiosConfig";
import Footer from "../components/Footer/Footer";
import designerBg from "../assets/Designer.png";
import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();

  const usernameDom = useRef(null);
  const firstnameDom = useRef(null);
  const lastnameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    try {
      setLoading(true);

      await axiosBase.post("/users/register", {
        username: usernameDom.current.value,
        firstname: firstnameDom.current.value,
        lastname: lastnameDom.current.value,
        email: emailDom.current.value,
        password: passwordDom.current.value,
      });

      setMsg({ type: "success", text: "Registration successful!" });
      setTimeout(() => navigate("/login"), 700);
    } catch (error) {
      const serverMessage =
        error?.response?.data?.msg ||
        error?.response?.data?.error ||
        "Something went wrong.";

      setMsg({ type: "error", text: serverMessage });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundImage: `url(${designerBg})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2>Sign Up</h2>

        {msg.text && (
          <div
            className={`${styles.msg} ${
              msg.type === "error" ? styles.error : styles.success
            }`}
          >
            {msg.text}
          </div>
        )}

        <input ref={emailDom} type="email" placeholder="Email" required />
        <input ref={firstnameDom} placeholder="First Name" required />
        <input ref={lastnameDom} placeholder="Last Name" required />
        <input ref={usernameDom} placeholder="Username" required />
        <input
          ref={passwordDom}
          type="password"
          placeholder="Password"
          required
        />

        <div className={styles.terms}>
          <input type="checkbox" required />
          <label>
            I agree to the <Link to="/terms">Privacy Policy</Link> and{" "}
            <Link to="/terms">Terms of Service</Link>
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering…" : "Agree and Join"}
        </button>

        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>

      <section className={styles.about}>
        <h3>About</h3>
        <p>Join our community of developers.</p>
      </section>

      <Footer />
    </div>
  );
}

export default Register;
