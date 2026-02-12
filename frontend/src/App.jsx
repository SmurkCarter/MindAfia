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
import PHQ9 from "./assessments/PHQ9";




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
        <Route path="/assessments/phq-9" element={<PHQ9 />} />


        <Route
  path="/patient/dashboard"
  element={
    <ProtectedRoute>
      <div>Patient Dashboard (Protected)</div>
    </ProtectedRoute>
  }
/>


      </Routes>
    </PageLayout>
  );
}

export default App;
