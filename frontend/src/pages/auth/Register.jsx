import { useState } from "react";
import { register } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
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
      await register(formData);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div style={container}>
      <h1>Register</h1>

      {error && <p style={errorStyle}>{error}</p>}

      <form onSubmit={handleSubmit} style={form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />

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

        <button type="submit">Create Account</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
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

export default Register;
