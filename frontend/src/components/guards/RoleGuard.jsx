import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RoleGuard = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (allowedRole === "patient" && !user?.is_patient) {
    return <Navigate to="/" />;
  }

  if (allowedRole === "clinician" && !user?.is_clinician) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleGuard;