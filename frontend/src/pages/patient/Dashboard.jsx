import {
  FaCalendarAlt,
  FaChartLine,
  FaClipboardList,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Chat from "./Chat";

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="patient-dashboard">

      {/* HEADER */}
      <div className="patient-header">
        <div>
          <h1>Hello, {user?.name || "Patient"} 👋</h1>
          <p>Here’s a snapshot of your mental wellness journey.</p>

          {/* ✅ BOOK APPOINTMENT BUTTON ADDED */}
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
          <h3>4</h3>
          <p>Assessments Completed</p>
        </div>

        <div className="patient-card">
          <FaCalendarAlt className="card-icon" />
          <h3>1</h3>
          <p>Upcoming Appointment</p>
        </div>

        <div className="patient-card">
          <FaChartLine className="card-icon" />
          <h3>Stable</h3>
          <p>Current Wellness Status</p>
        </div>

      </div>

      {/* DASHBOARD CONTENT GRID */}
      <div className="dashboard-bottom">

        {/* LEFT SIDE */}
        <div className="dashboard-left">

          {/* RECENT ACTIVITY */}
          <div className="patient-section">
            <h2>Recent Assessments</h2>

            <div className="activity-card">
              <strong>PHQ-9 (Depression)</strong>
              <p>Score: 8 — Mild Depression</p>
            </div>

            <div className="activity-card">
              <strong>GAD-7 (Anxiety)</strong>
              <p>Score: 6 — Mild Anxiety</p>
            </div>
          </div>

          {/* RECOMMENDATIONS */}
          <div className="patient-section">
            <h2>Personalized Recommendations</h2>

            <div className="recommendation-card">
              <p>
                Based on your recent assessments, consider scheduling a follow-up
                consultation and practicing guided breathing exercises.
              </p>
            </div>
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
