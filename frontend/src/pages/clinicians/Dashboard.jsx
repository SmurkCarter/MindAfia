import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import { FaBell, FaExclamationTriangle } from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

const ClinicianDashboard = () => {

  const navigate = useNavigate();

  const [doctorName, setDoctorName] = useState("Doctor");
  const [patients, setPatients] = useState([]);

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const [showMessageForm, setShowMessageForm] = useState(false);

  const [messageData, setMessageData] = useState({
    patient: "",
    message: ""
  });

  const COLORS = ["#1b4f72", "#f39c12", "#e74c3c"];

  const assessmentStats = [
    { name: "PHQ9", value: 7 },
    { name: "GAD7", value: 8 },
    { name: "Burnout", value: 13 }
  ];

  const severityData = [
    { level: "Low", patients: 6 },
    { level: "Moderate", patients: 4 },
    { level: "High", patients: 2 }
  ];

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const userRes = await api.get("auth/me/");
        setDoctorName(userRes.data.first_name || userRes.data.username);

        const res = await api.get("appointments/dashboard/patients/");
        setPatients(res.data);

      } catch (err) {

        console.error("Dashboard load error", err);

      }

    };

    loadDashboard();

  }, []);

  const highRiskPatients = patients.filter(
    p => p.risk && p.risk.toLowerCase() === "high"
  );

  const handleMessageChange = (e) => {

    setMessageData({
      ...messageData,
      [e.target.name]: e.target.value
    });

  };

  const sendMessage = () => {

    const patient = patients.find(
      p => p.patient_name === messageData.patient
    );

    if (!patient) {
      alert("Please select a patient");
      return;
    }

    navigate(`/clinician/chat/${patient.appointment_id}`);

  };

  return (

    <div className="clinician-layout">

      {/* SIDEBAR */}
      <aside className="clinician-sidebar">

        <h3>Clinician Panel</h3>

        <ul>
          <li className={activeSection === "overview" ? "active" : ""} onClick={() => setActiveSection("overview")}>Overview</li>
          <li className={activeSection === "patients" ? "active" : ""} onClick={() => setActiveSection("patients")}>My Patients</li>
          <li className={activeSection === "appointments" ? "active" : ""} onClick={() => setActiveSection("appointments")}>Appointments</li>
          <li className={activeSection === "assessments" ? "active" : ""} onClick={() => setActiveSection("assessments")}>Assessments</li>
        </ul>

      </aside>


      {/* MAIN */}
      <div className="clinician-main">

        {/* TOPBAR */}
        <div className="clinician-topbar">

          <h1>Welcome Back, Dr. {doctorName} 👋</h1>

          <FaBell
            className="notification-icon"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          />

        </div>


        {/* OVERVIEW */}
        {activeSection === "overview" && (

          <>

            {highRiskPatients.length > 0 && (
              <div className="alert-card">
                <FaExclamationTriangle />
                <div>
                  <strong>High Risk Alert:</strong> {highRiskPatients.map(p => p.patient_name).join(", ")}
                </div>
              </div>
            )}

            {/* ANALYTICS */}
            <div className="analytics-section">

              <h2>Assessment Analytics</h2>

              <div className="analytics-grid">

                <div className="analytics-card">

                  <h3>Assessment Distribution</h3>

                  <ResponsiveContainer width="100%" height={250}>

                    <PieChart>

                      <Pie
                        data={assessmentStats}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label
                      >

                        {assessmentStats.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

                <div className="analytics-card">

                  <h3>Patient Risk Levels</h3>

                  <ResponsiveContainer width="100%" height={250}>

                    <BarChart data={severityData}>

                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="level" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="patients" fill="#1b4f72" />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>


            {/* QUICK ACTIONS */}
            <div className="quick-actions">

              <button>Add Notes</button>

              <button>Schedule Appointment</button>

              <button onClick={() => setShowMessageForm(true)}>
                Message Patient
              </button>

              <button>Create Treatment Plan</button>

            </div>


            {/* PATIENT MANAGEMENT */}
            <div className="clinician-grid">

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

                        <td>{patient.patient_name}</td>

                        <td>{patient.last_visit}</td>

                        <td className={`risk-${patient.risk.toLowerCase()}`}>
                          {patient.risk}
                        </td>

                        <td>{patient.status}</td>

                        <td>

                          <button
                            className="view-btn"
                            onClick={() => navigate(`/clinician/chat/${patient.appointment_id}`)}
                          >
                            View
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </>

        )}

      </div>


      {/* MESSAGE MODAL */}
      {showMessageForm && (

        <div className="treatment-modal">

          <div className="treatment-card">

            <h2>Message Patient</h2>

            <div className="form-group">

              <label>Select Patient</label>

              <select
                name="patient"
                value={messageData.patient}
                onChange={handleMessageChange}
              >

                <option value="">Select Patient</option>

                {patients.map((p, index) => (

                  <option key={index} value={p.patient_name}>
                    {p.patient_name}
                  </option>

                ))}

              </select>

            </div>

            <div className="form-group full">

              <label>Message</label>

              <textarea
                name="message"
                placeholder="Write message..."
                value={messageData.message}
                onChange={handleMessageChange}
              />

            </div>

            <div className="treatment-buttons">

              <button className="save-plan" onClick={sendMessage}>
                Open Chat
              </button>

              <button
                className="cancel-plan"
                onClick={() => setShowMessageForm(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default ClinicianDashboard;