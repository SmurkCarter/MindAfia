import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      localStorage.setItem("token", data.access);
      navigate("/");
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <div style={container}>
      <h1>Login</h1>

      {error && <p style={errorStyle}>{error}</p>}

      <form onSubmit={handleSubmit} style={form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

const container = {
  maxWidth: "400px",
  margin: "5rem auto",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const errorStyle = {
  color: "red",
};

export default Login;
