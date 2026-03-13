import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const CompleteProfile = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.put("patient/me/", form);

      navigate("/patient/dashboard");

    } catch (error) {

      console.error("Profile update error:", error);

    }

  };

  return (

    <div className="complete-profile">

      <h2>Complete Your Profile</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          required
        />

        <input
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date_of_birth"
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          onChange={handleChange}
          required
        >

          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>

        </select>

        <button type="submit">
          Save Profile
        </button>

      </form>

    </div>

  );

};

export default CompleteProfile;