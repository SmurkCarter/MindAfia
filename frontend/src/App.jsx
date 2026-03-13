import { Routes, Route } from "react-router-dom";

import PageLayout from "./components/layout/PageLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/guards/RoleGuard";

/* PUBLIC */
import Home from "./pages/public/Home";
import Disorders from "./pages/public/Disorders";
import DisorderDetail from "./pages/public/DisorderDetail";
import Assessments from "./pages/public/Assessments";
import Treatments from "./pages/public/Treatments";

/* AUTH */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* PATIENT */
import PatientDashboard from "./pages/patient/Dashboard";
import Chat from "./pages/patient/Chat";
import BookAppointment from "./pages/patient/BookAppointment";
import CompleteProfile from "./pages/patient/CompleteProfile";
import PatientProfile from "./pages/patient/Profile";

/* ASSESSMENTS */
import PHQ9 from "./pages/assessments/PHQ9";
import GAD7 from "./pages/assessments/GAD7";
import AUDIT from "./pages/assessments/AUDIT";
import Burnout from "./pages/assessments/Burnout";

/* CLINICIAN */
import ClinicianDashboard from "./pages/clinicians/Dashboard";



function App() {
  return (
    <PageLayout>

      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Home />} />
        <Route path="/disorders" element={<Disorders />} />
        <Route path="/disorders/:slug" element={<DisorderDetail />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/treatments" element={<Treatments />} />
        


        {/* ================= AUTH ================= */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* ================= PATIENT ================= */}

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["patient"]}>
                <PatientDashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route path="/patient/chat/:appointmentId" element={<Chat />} />
        <Route path="/clinician/chat/:appointmentId" element={<Chat />} />

        <Route
          path="/patient/book-appointment"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["patient"]}>
                <BookAppointment />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["patient"]}>
                <PatientProfile />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/complete-profile"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["patient"]}>
                <CompleteProfile />
              </RoleGuard>
            </ProtectedRoute>
          }
        />


        {/* ================= ASSESSMENTS ================= */}

        <Route
          path="/assessments/depression"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["patient"]}>
                <PHQ9 />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/assessments/anxiety"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["patient"]}>
                <GAD7 />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/assessments/audit"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["patient"]}>
                <AUDIT />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/assessments/burnout"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["patient"]}>
                <Burnout />
              </RoleGuard>
            </ProtectedRoute>
          }
        />


        {/* ================= CLINICIAN ================= */}

        <Route
          path="/clinician/dashboard"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["clinician"]}>
                <ClinicianDashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

      </Routes>

    </PageLayout>
  );
}

export default App;