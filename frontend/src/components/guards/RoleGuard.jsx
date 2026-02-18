import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RoleGuard = ({ allowedRole, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleGuard;
