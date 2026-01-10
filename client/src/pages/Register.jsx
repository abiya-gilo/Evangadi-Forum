import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/users/register", form);
      navigate("/login");
    } catch (error) {
      console.log("Registration error:", error);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2>Create a new account</h2>
        <p>
          Already have an account?{" "}
          <Link to="/login" className={styles.blueLink}>
            Sign In
          </Link>
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.submitBtn}>
            Agree and Join
          </button>
        </form>
      </div>

      <div className={styles.right}>
        <h2>About</h2>
        <h3>Evangadi Networks Q&A</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
          voluptate officiis beatae nobis pariatur omnis facere accusamus
          laboriosam hic, adipisci vero reiciendis, recusandae sit ad, eum
          quisquam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ipsum,
          provident minus laudantium esse soluta maiores nostrum nisi sunt
          perferendis dolorum.
        </p>

        <Link to="/how-it-works" className={styles.blueLink}>
          HOW IT WORKS
        </Link>
      </div>
    </div>
  );
}

export default Register;
