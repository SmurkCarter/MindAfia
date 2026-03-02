import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import api from "../../services/api";

const Login = () => {
  const [status, setStatus] = useState("idle");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 🔥 REAL LOGIN CALL
      const tokenData = await loginUser({
        username,
        password,
      });

      // 🔥 Fetch logged-in user details
      const userResponse = await api.get("auth/me/");
      const user = userResponse.data;

      // Save to AuthContext
      login(tokenData.access, user, rememberMe);

      setStatus("success");

      setTimeout(() => {
        if (user.is_patient) {
          navigate("/patient/dashboard");
        } else if (user.is_clinician) {
          navigate("/clinician/dashboard");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (error) {
      console.error("Login failed:", error);
      setStatus("idle");
      alert("Invalid credentials");
    }
  };

  return (
    <AuthLayout>
      <h2 className="auth-title">Welcome Back</h2>
      <p className="auth-subtitle">
        Log in to access your mental health dashboard.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="auth-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="remember-me">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className={`auth-btn ${status}`}
          disabled={status !== "idle"}
        >
          {status === "idle" && "Login"}
          {status === "loading" && <span className="spinner"></span>}
          {status === "success" && <span className="checkmark">✓</span>}
        </button>
      </form>

      <p className="auth-footer">
        Don’t have an account? <Link to="/register">Create one</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;