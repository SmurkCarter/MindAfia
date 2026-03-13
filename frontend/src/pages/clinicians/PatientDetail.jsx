import { useEffect, useState } from "react";
import api from "../../services/api";

const PatientDetail = ({ patientId }) => {

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    loadPatient();
  }, []);

  const loadPatient = async () => {

    try {

      const res = await api.get(`patients/${patientId}/`);
      setPatient(res.data);

    } catch (err) {
      console.error(err);
    }

  };

  if (!patient) return <p>Loading...</p>;

  return (

    <div className="dashboard-card">

      <h2>Patient Details</h2>

      <p><strong>Name:</strong> {patient.user.username}</p>
      <p><strong>Email:</strong> {patient.user.email}</p>

      <h3>History</h3>

      <p>{patient.history || "No history recorded."}</p>

    </div>

  );
};

export default PatientDetail;