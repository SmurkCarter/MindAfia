import { useEffect, useState } from "react";
import api from "../../services/api";

const PatientProfile = () => {

  const [profile, setProfile] = useState(null);

  useEffect(() => {

    const loadProfile = async () => {

      try {

        const res = await api.get("patient/me/");
        setProfile(res.data);

      } catch (error) {

        console.error("Profile fetch error:", error);

      }

    };

    loadProfile();

  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (

    <div className="profile-page">

      <h2>My Profile</h2>

      <div className="profile-card">

        <p><strong>Username:</strong> {profile.username}</p>

        <p><strong>Full Name:</strong> {profile.first_name} {profile.last_name}</p>

        <p><strong>Email:</strong> {profile.email}</p>

        <p><strong>Date of Birth:</strong> {profile.date_of_birth}</p>

        <p><strong>Gender:</strong> {profile.gender}</p>

      </div>

    </div>

  );

};

export default PatientProfile;