import { useState } from "react";
import { FaBell, FaExclamationTriangle } from "react-icons/fa";

const ClinicianDashboard = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const patients = [
    {
      name: "John Doe",
      lastVisit: "2026-01-12",
      risk: "High",
      status: "Active",
    },
    {
      name: "Mary Jane",
      lastVisit: "2026-01-10",
      risk: "Moderate",
      status: "Active",
    },
    {
      name: "Peter Smith",
      lastVisit: "2025-12-20",
      risk: "Low",
      status: "Inactive",
    },
  ];

  const highRiskPatients = patients.filter(p => p.risk === "High");

  return (
    <div className="clinician-layout">

      {/* ===== SIDEBAR ===== */}
      <aside className="clinician-sidebar">
        <h3>Clinician Panel</h3>
        <ul>
          <li className="active">Overview</li>
          <li>My Patients</li>
          <li>Appointments</li>
          <li>Assessments</li>
        </ul>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="clinician-main">

        {/* ===== TOP BAR ===== */}
        <div className="clinician-topbar">
          <h1>Welcome Back, Dr. Smith 👋</h1>

          <div className="notification-wrapper">
            <FaBell
              className="notification-icon"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            />

            {notificationsOpen && (
              <div className="notification-dropdown">
                <p>🔔 New PHQ-9 submitted</p>
                <p>🕒 Appointment at 10:00 AM</p>
              </div>
            )}
          </div>
        </div>

        {/* ===== HIGH RISK ALERTS ===== */}
        {highRiskPatients.length > 0 && (
          <div className="alert-card">
            <FaExclamationTriangle />
            <div>
              <strong>High Risk Alert:</strong>{" "}
              {highRiskPatients.map(p => p.name).join(", ")} (Severe Depression)
            </div>
          </div>
        )}

        {/* ===== QUICK ACTIONS ===== */}
        <div className="quick-actions">
          <button>Add Notes</button>
          <button>Schedule Appointment</button>
          <button>Message Patient</button>
          <button>Create Treatment Plan</button>
        </div>

        {/* ===== DASHBOARD GRID ===== */}
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
                {patients.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.name}</td>
                    <td>{patient.lastVisit}</td>
                    <td className={`risk-${patient.risk.toLowerCase()}`}>
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

          {/* MINI CALENDAR */}
          <div className="dashboard-card">
            <h3>This Week</h3>
            <ul className="calendar-list">
              <li>Mon - John Doe (10:00 AM)</li>
              <li>Tue - Mary Jane (1:30 PM)</li>
              <li>Thu - Peter Smith (11:00 AM)</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClinicianDashboard;
