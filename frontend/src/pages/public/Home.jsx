import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Mental Health Matters</h1>

          <p>
            MindAfya is a secure telepsychiatry platform that helps you understand
            your mental health, take evidence-based self-assessments, and connect
            with qualified clinicians all in one place.
          </p>

          <div className="hero-actions">
            <Link to="/assessments">
              <button className="btn-primary">Take a Self-Assessment</button>
            </Link>

            <Link to="/disorders">
              <button className="btn-secondary">Learn About Disorders</button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="home-section">
        <div className="container">
          <h2>What MindAfya Offers</h2>

          <div className="features-grid">
            <Feature
              title="Self-Assessment Tools"
              description="Clinically validated tools such as PHQ-9, GAD-7, AUDIT, and Burnout assessments to help you understand your mental health status."
            />

            <Feature
              title="Mental Health Education"
              description="Learn about common mental health disorders, symptoms, and treatment approaches in simple, clear language."
            />

            <Feature
              title="Professional Support"
              description="Book appointments and share assessment results with qualified clinicians for guided care."
            />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <div className="container">
          <h2>Start Your Mental Health Journey Today</h2>

          <p>
            Whether you’re feeling overwhelmed, curious, or just want clarity,
            MindAfya gives you a safe place to begin.
          </p>

          <Link to="/assessments">
            <button className="btn-primary">Get Started</button>
          </Link>
        </div>
      </section>
    </>
  );
};

/* Reusable feature block */
const Feature = ({ title, description }) => (
  <div className="feature-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default Home;
