import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import {
  FaCalendarAlt,
  FaChartLine,
  FaClipboardList,
  FaUserCircle,
  FaComments
} from "react-icons/fa";

const PatientDashboard = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [notes, setNotes] = useState([]);
  const [riskLevel, setRiskLevel] = useState(null);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const res = await api.get("patient/dashboard/");

        if (!res.data.profile_complete) {
          navigate("/patient/complete-profile");
          return;
        }

        setAssessments(res.data.latest_assessments || []);
        setAppointments(res.data.upcoming_appointments || []);
        setNotes(res.data.recent_notes || []);

        if (res.data.latest_assessments.length > 0) {
          setRiskLevel(res.data.latest_assessments[0].severity);
        }

      } catch (error) {

        console.error("Dashboard load error:", error);

      }

    };

    loadDashboard();

  }, []);

  const openChat = (appointmentId) => {

    if (!appointmentId) {
      console.error("Invalid appointment id");
      return;
    }

    navigate(`/patient/chat/${appointmentId}`);

  };

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
            + Book Appointment
          </Link>

        </div>

        <Link to="/patient/profile" className="patient-avatar">
          <FaUserCircle size={45} />
        </Link>

      </div>


      {/* SUMMARY CARDS */}

      <div className="patient-cards">

        <div className="patient-card">
          <FaClipboardList className="card-icon"/>
          <h3>{assessments.length}</h3>
          <p>Assessments Done</p>
        </div>

        <div className="patient-card">
          <FaCalendarAlt className="card-icon"/>
          <h3>{appointments.length}</h3>
          <p>Upcoming Appointments</p>
        </div>

        <div className="patient-card">
          <FaChartLine className="card-icon"/>
          <h3>{riskLevel || "N/A"}</h3>
          <p>Current Risk Level</p>
        </div>

      </div>


      {/* DASHBOARD GRID */}

      <div className="dashboard-bottom">

        {/* LEFT SIDE */}

        <div className="dashboard-left">

          <div className="patient-section">

            <h2>Recent Assessments</h2>

            {assessments.length === 0 && <p>No assessments yet</p>}

            {assessments.map((a, index) => (

              <div className="activity-card" key={index}>

                <strong>{a.type}</strong>

                <p>
                  Score: {a.score} — {a.severity}
                </p>

                <p>
                  Date: {a.date}
                </p>

              </div>

            ))}

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="dashboard-right">

          <div className="patient-section">

            <h2>Upcoming Appointments</h2>

            {appointments.length === 0 && (
              <p>No appointments scheduled</p>
            )}

            {appointments.map((appt, index) => {

              // 🔑 robust id detection
              const appointmentId =
                appt.id ||
                appt.appointment_id ||
                appt.appointment?.id;

              return (

                <div className="activity-card" key={index}>

                  <p><strong>Doctor:</strong> {appt.doctor}</p>

                  <p>
                    {appt.date} — {appt.time}
                  </p>

                  {appointmentId && (
                    <button
                      className="chat-btn"
                      onClick={() => openChat(appointmentId)}
                    >
                      <FaComments /> Open Chat
                    </button>
                  )}

                </div>

              );

            })}

          </div>

        </div>

      </div>

    </div>

  );

};

export default PatientDashboard;