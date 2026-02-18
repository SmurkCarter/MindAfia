import { Routes, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Home from "./pages/public/Home";
import Disorders from "./pages/public/Disorders";
import DisorderDetail from "./pages/public/DisorderDetail";
import Assessments from "./pages/public/Assessments";
import Treatments from "./pages/public/Treatments";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientDashboard from "./pages/patient/Dashboard";
import PHQ9 from "./pages/assessments/PHQ9";
import ClinicianDashboard from "./pages/clinicians/Dashboard";
import RoleGuard from "./components/guards/RoleGuard";
import Chat from "./pages/patient/Chat";
import BookAppointment from "./pages/patient/BookAppointment";





function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disorders" element={<Disorders />} />
        <Route path="/disorders/:slug" element={<DisorderDetail />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        



       <Route
  path="/patient/dashboard"
  element={
    <ProtectedRoute>
      <PatientDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/patient/chat"
  element={
    <RoleGuard allowedRoles={["patient"]}>
      <Chat />
    </RoleGuard>
  }
/>
<Route
    path="/clinician/dashboard"
    element={
      <ProtectedRoute allowedRole="clinician">
        <ClinicianDashboard />
      </ProtectedRoute>
    }
  />
  <Route
  path="/patient/book-appointment"
  element={
    <ProtectedRoute>
      <RoleGuard allowedRole="patient">
        <BookAppointment />
      </RoleGuard>
    </ProtectedRoute>
  }
/>
<Route
  path="/assessments/depression"
  element={
    <ProtectedRoute>
      <RoleGuard allowedRole="patient">
        <PHQ9 />
      </RoleGuard>
    </ProtectedRoute>
  }
/>


      </Routes>
    </PageLayout>
  );
}

export default App;
