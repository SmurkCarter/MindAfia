import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link } from "react-router-dom";

const Login = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const { login } = useAuth();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 🔹 Replace this with your real API call
      // Example mock response
      const fakeResponse = {
        access: "mock-jwt-token",
        user: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "patient", // change to "clinician" to test
        },
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save to AuthContext
      login(fakeResponse.access, fakeResponse.user, rememberMe);


      // Trigger success animation
      setStatus("success");

      // Wait for animation then redirect
      setTimeout(() => {
        if (fakeResponse.user.role === "patient") {
          navigate("/patient/dashboard");
        } else if (fakeResponse.user.role === "clinician") {
          navigate("/clinician/dashboard");
        }
      }, 1000);

    } catch (error) {
      console.error("Login failed:", error);
      setStatus("idle");
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
          type="email"
          placeholder="Email address"
          className="auth-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
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
