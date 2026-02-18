import { Link, useNavigate } from "react-router-dom";
import { FaBrain, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      
      {/* LEFT: BRAND */}
      <div className="nav-left">
        <FaBrain className="brand-icon" />
        <span className="brand-text">MindAfya</span>
      </div>

      {/* CENTER: NAV LINKS */}
      <ul className="nav-center">
        <li><Link to="/">Home</Link></li>

        {/* ABOUT DROPDOWN */}
        <li
          className="dropdown"
          onMouseEnter={() => setOpenDropdown("about")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <span>
            About Us <FaChevronDown size={12} />
          </span>

          {openDropdown === "about" && (
            <ul className="dropdown-menu">
              <li><Link to="/about">Who We Are</Link></li>
              <li><Link to="/about/mission">Our Mission</Link></li>
            </ul>
          )}
        </li>

        {/* TREATMENTS DROPDOWN */}
        <li
          className="dropdown"
          onMouseEnter={() => setOpenDropdown("treatments")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <span>
            Treatments <FaChevronDown size={12} />
          </span>

          {openDropdown === "treatments" && (
            <ul className="dropdown-menu">
              <li><Link to="/treatments">Curative</Link></li>
              <li><Link to="/treatments">Preventive</Link></li>
              <li><Link to="/treatments">Promotive</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/disorders">Disorders</Link></li>
        <li><Link to="/assessments">Assessments</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* RIGHT SIDE */}
      <div className="nav-right">

  {!isAuthenticated ? (
    <>
      <Link to="/login" className="login-link">
        Login
      </Link>

      <Link to="/register" className="register-link">
        Register
      </Link>
    </>
  ) : (
    <>
      {/* ROLE BASED DASHBOARD LINK */}
      {user?.role === "patient" && (
        <Link to="/patient/dashboard" className="dashboard-link">
          Dashboard
        </Link>
      )}

      {user?.role === "clinician" && (
        <Link to="/clinician/dashboard" className="dashboard-link">
          Clinician Panel
        </Link>
      )}

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </>
  )}

  <Link
  to={
    user?.role === "patient"
      ? "/patient/book-appointment"
      : user?.role === "clinician"
      ? "/clinician/dashboard"
      : "/login"
  }
>
  <button className="btn-cta">
    Book Appointment
  </button>
</Link>


</div>

    </nav>
  );
};

export default Navbar;
