import { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { registerPatient } from "../../services/authService";

const Register = () => {

  const [status, setStatus] = useState("idle");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setStatus("loading");

    try {

      await registerPatient(form);

      setStatus("success");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      console.error(error.response?.data);
      alert("Registration failed");

      setStatus("idle");
    }
  };

  return (
    <AuthLayout>

      <h2 className="auth-title">Create Account</h2>

      <p className="auth-subtitle">
        Join MindAfya and begin your mental wellness journey.
      </p>

      <form onSubmit={handleSubmit}>

        <input
          name="username"
          type="text"
          placeholder="Username"
          className="auth-input"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email address"
          className="auth-input"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="auth-input"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className={`auth-btn ${status}`}
          disabled={status === "loading"}
        >
          {status === "idle" && "Register"}
          {status === "loading" && <span className="spinner"></span>}
          {status === "success" && <span className="checkmark">✓</span>}
        </button>

        {status === "success" && (
          <p className="success-text">
            Account created successfully! Redirecting...
          </p>
        )}

      </form>

      <p className="auth-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>

    </AuthLayout>
  );
};

export default Register;