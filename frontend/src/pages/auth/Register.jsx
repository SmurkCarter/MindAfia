import { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus("loading");

    // simulate API call
    setTimeout(() => {
      setStatus("success");

      
      setTimeout(() => {
        navigate("/login");
      }, 1800);

    }, 1500);
  };

  return (
    <AuthLayout>
      <h2 className="auth-title">Create Account</h2>
      <p className="auth-subtitle">
        Join MindAfya and begin your mental wellness journey.
      </p>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" className="auth-input" />
        <input type="email" placeholder="Email address" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />

        <button
          type="submit"
          className={`auth-btn ${status}`}
          disabled={status !== "idle"}
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
