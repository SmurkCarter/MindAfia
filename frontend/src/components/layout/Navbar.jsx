import { Link } from "react-router-dom";
import { FaBrain, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav style={nav}>
      {/* LEFT: BRAND */}
      <div style={left}>
        <FaBrain size={26} color="#075985" />
        <span style={brandText}>MindAfya</span>
      </div>

      {/* CENTER: NAV LINKS */}
      <ul style={center}>
        <li><Link to="/">Home</Link></li>

        {/* ABOUT DROPDOWN */}
        <li
          style={dropdownWrapper}
          onMouseEnter={() => setOpenDropdown("about")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <span style={navItem}>
            About Us <FaChevronDown size={12} />
          </span>

          {openDropdown === "about" && (
            <ul style={dropdownMenu}>
              <li><Link to="/about">Who We Are</Link></li>
              <li><Link to="/about/mission">Our Mission</Link></li>
            </ul>
          )}
        </li>

        {/* TREATMENTS DROPDOWN */}
        <li
          style={dropdownWrapper}
          onMouseEnter={() => setOpenDropdown("treatments")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <span style={navItem}>
            Treatments <FaChevronDown size={12} />
          </span>

          {openDropdown === "treatments" && (
            <ul style={dropdownMenu}>
              <li><Link to="/treatments">Curative Treatments</Link></li>
              <li><Link to="/treatments">Preventive Treatment</Link></li>
              <li><Link to="/treatments">Promotive Treatments</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/disorders">Disorders</Link></li>
        <li><Link to="/assessments">Assessments</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      {/* RIGHT: CTA */}
      <div style={right}>
        <Link to="/appointments">
          <button style={ctaButton}>Book an Appointment</button>
        </Link>
      </div>
    </nav>
  );
};

/* ===== Styles ===== */

const nav = {
  display: "flex",
  alignItems: "center",
  padding: "1rem 2.5rem",
  borderBottom: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
};

const left = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  flex: 1,
};

const brandText = {
  fontSize: "1.25rem",
  fontWeight: "700",
  color: "#075985",
};

const center = {
  display: "flex",
  listStyle: "none",
  gap: "2.5rem",
  justifyContent: "center",
  alignItems: "center",
  margin: 0,
  padding: 0,
  flex: 2,
};

const navItem = {
  display: "flex",
  alignItems: "center",
  gap: "0.3rem",
  cursor: "pointer",
  fontWeight: 500,
};

const dropdownWrapper = {
  position: "relative",
};

const dropdownMenu = {
  position: "absolute",
  top: "2.5rem",
  left: 0,
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "0.75rem 0",
  minWidth: "220px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  animation: "fadeSlide 0.2s ease-out",
  zIndex: 1000,
};

const right = {
  display: "flex",
  justifyContent: "flex-end",
  flex: 1,
};

const ctaButton = {
  backgroundColor: "#075985",
  color: "#ffffff",
  border: "none",
  borderRadius: "999px",
  padding: "0.6rem 1.6rem",
  fontWeight: "600",
  cursor: "pointer",
};

export default Navbar;
