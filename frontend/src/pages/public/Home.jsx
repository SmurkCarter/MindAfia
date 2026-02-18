import { Link } from "react-router-dom";

/* ✅ Define Feature FIRST */
const Feature = ({ icon, title, description }) => (
  <div className="offer-card">
    <div className="offer-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Your Mental Health Matters</h1>

            <p>
              MindAfya is a secure telepsychiatry platform that helps you
              understand your mental health, take evidence-based self-assessments,
              and connect with qualified clinicians all in one place.
            </p>

            <div className="hero-buttons">
              <Link to="/assessments" className="btn-primary">
                Take a Self-Assessment
              </Link>

              <Link to="/disorders" className="btn-outline">
                Learn About Disorders
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="offers-section">
        <h2 className="section-title">What MindAfya Offers</h2>

        <div className="offers-grid">
          <Feature
            icon="🧠"
            title="Self-Assessment Tools"
            description="Clinically validated tools such as PHQ-9, GAD-7, AUDIT, and Burnout assessments to help you understand your mental health status."
          />

          <Feature
            icon="📘"
            title="Mental Health Education"
            description="Learn about common mental health disorders, symptoms, and treatment approaches in simple, clear language."
          />

          <Feature
            icon="👩‍⚕️"
            title="Professional Support"
            description="Book appointments and share assessment results with qualified clinicians for guided care."
          />
        </div>
      </section>
    </>
  );
};

export default Home;
