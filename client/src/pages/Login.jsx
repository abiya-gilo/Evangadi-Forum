import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosBase from "../services/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    try {
      setLoading(true);

      const response = await axiosBase.post("/users/login", {
        email: emailDom.current.value,
        password: passwordDom.current.value,
      });

      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);

      setMsg({ type: "success", text: "Login successful!" });

      setTimeout(() => navigate("/home"), 700);
    } catch (error) {
      const serverMessage =
        error?.response?.data?.msg ||
        error?.response?.data?.error ||
        "Invalid credentials";

      setMsg({ type: "error", text: serverMessage });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        {/* LEFT SIDE - LOGIN FORM */}
        <div className={styles.left}>
          <div className={styles.loginBox}>
            <h2 className={styles.title}>Login to your account</h2>
            <p className={styles.subtitle}>
              Don't have an account?{" "}
              <Link to="/register" className={styles.createLink}>
                create a new account
              </Link>
            </p>

            {msg.text && (
              <p
                className={
                  msg.type === "error" ? styles.errorMsg : styles.successMsg
                }
              >
                {msg.text}
              </p>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Username or Email</label>
                <input
                  id="email"
                  ref={emailDom}
                  type="email"
                  placeholder="Enter your username or email"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordContainer}>
                  <input
                    id="password"
                    ref={passwordDom}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={styles.input}
                    required
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <Link to="#" className={styles.forgotPassword}>
                Forgot password?
              </Link>

              <button
                type="submit"
                disabled={loading}
                className={styles.loginBtn}
              >
                {loading ? "Logging in…" : "Login"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE - INFO SECTION */}
        <div className={styles.right}>
          <div className={styles.topButtons}>
            <Link to="/how-it-works" className={styles.howBtn}>
              How it Works
            </Link>
          </div>

          <div className={styles.aboutSection}>
            <h3 className={styles.aboutTitle}>About Evangadi Networks</h3>
            <p className={styles.aboutText}>
              No matter what stage of life you are in, whether you're just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p className={styles.aboutText}>
              Whether you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
          </div>

          <Link to="/how-it-works" className={styles.howItWorksBtn}>
            HOW IT WORKS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
