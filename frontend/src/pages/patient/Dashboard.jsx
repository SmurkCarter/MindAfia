import {
  FaCalendarAlt,
  FaChartLine,
  FaClipboardList,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Chat from "./Chat";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assessmentsRes = await api.get("assessments/my/");
        setAssessments(assessmentsRes.data);

        const appointmentsRes = await api.get("appointments/");
        setAppointments(appointmentsRes.data);

      } catch (error) {
        console.error("Error loading patient data:", error);
      }
    };

    fetchData();
  }, []);

  const latestAssessment = assessments[0];

  return (
    <div className="patient-dashboard">

      {/* HEADER */}
      <div className="patient-header">
        <div>
          <h1>Hello, {user?.username || "Patient"} 👋</h1>
          <p>Here’s a snapshot of your mental wellness journey.</p>

          <Link
            to="/patient/book-appointment"
            className="book-appointment-btn"
          >
            + Book New Appointment
          </Link>
        </div>

        <div className="patient-avatar">
          <FaUserCircle />
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="patient-cards">

        <div className="patient-card">
          <FaClipboardList className="card-icon" />
          <h3>{assessments.length}</h3>
          <p>Assessments Completed</p>
        </div>

        <div className="patient-card">
          <FaCalendarAlt className="card-icon" />
          <h3>{appointments.length}</h3>
          <p>Upcoming Appointments</p>
        </div>

        <div className="patient-card">
          <FaChartLine className="card-icon" />
          <h3>{latestAssessment?.risk_level || "N/A"}</h3>
          <p>Current Risk Level</p>
        </div>

      </div>

      {/* DASHBOARD CONTENT GRID */}
      <div className="dashboard-bottom">

        {/* LEFT SIDE */}
        <div className="dashboard-left">

          {/* RECENT ACTIVITY */}
          <div className="patient-section">
            <h2>Recent Assessments</h2>

            {assessments.slice(0, 2).map((assessment) => (
              <div className="activity-card" key={assessment.id}>
                <strong>{assessment.assessment}</strong>
                <p>
                  Score: {assessment.total_score} — {assessment.severity}
                </p>
                <p>
                  Risk: {assessment.risk_level || "Pending"}
                </p>
              </div>
            ))}

            {assessments.length === 0 && (
              <p>No assessments yet.</p>
            )}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="dashboard-right">
          <Chat />
        </div>

      </div>

    </div>
  );
};

export default PatientDashboard;