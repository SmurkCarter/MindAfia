import { useState, useEffect } from "react";
import { FaBell, FaExclamationTriangle } from "react-icons/fa";
import api from "../../services/api";

const ClinicianDashboard = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("clinicians/dashboard/");
        setData(response.data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

  if (!data) return <div>Loading dashboard...</div>;

  return (
    <div className="clinician-layout">

      {/* SIDEBAR */}
      <aside className="clinician-sidebar">
        <h3>Clinician Panel</h3>
        <ul>
          <li className="active">Overview</li>
          <li>My Patients</li>
          <li>Appointments</li>
          <li>Assessments</li>
        </ul>
      </aside>

      <div className="clinician-main">

        {/* TOPBAR */}
        <div className="clinician-topbar">
          <h1>
            Welcome Back, Dr.{" "}
            {typeof data.clinician === "string"
              ? data.clinician
              : data.clinician?.name || "Clinician"} 👋
          </h1>

          <FaBell
            className="notification-icon"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          />
        </div>

        {/* HIGH RISK ALERT */}
        {data.high_risk_alerts?.length > 0 && (
          <div className="alert-card">
            <FaExclamationTriangle />
            <div>
              <strong>High Risk Alert:</strong>{" "}
              {data.high_risk_alerts
                .map((p) => p.patient_name || p.patient__username)
                .join(", ")}
            </div>
          </div>
        )}

        {/* QUICK ACTIONS */}
        <div className="quick-actions">
          <button>Add Notes</button>
          <button>Schedule Appointment</button>
          <button>Message Patient</button>
          <button>Create Treatment Plan</button>
        </div>

        <div className="clinician-grid">

          {/* PATIENT TABLE */}
          <div className="dashboard-card">
            <h3>Patient Management</h3>
            <table className="patient-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Last Visit</th>
                  <th>Risk</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.patients?.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.name}</td>
                    <td>{patient.last_visit}</td>
                    <td className={`risk-${patient.risk?.toLowerCase()}`}>
                      {patient.risk}
                    </td>
                    <td>{patient.status}</td>
                    <td>
                      <button className="view-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* WEEKLY APPOINTMENTS */}
          <div className="dashboard-card">
            <h3>This Week</h3>
            <ul className="calendar-list">
              {data.week_appointments?.map((appt, index) => (
                <li key={index}>
                  {appt.day} - {appt.patient_name} ({appt.time})
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClinicianDashboard;