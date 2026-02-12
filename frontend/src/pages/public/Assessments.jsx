import React from 'react'
import { Link } from "react-router-dom";
import {
  FaBrain,
  FaWineBottle,
  FaFireAlt,
  FaRegSadTear,
} from "react-icons/fa";

const assessments = [
  {
    slug: "anxiety",
    title: "Anxiety",
    description:
      "Measures symptoms of excessive worry, fear, or nervousness that may indicate an anxiety disorder.",
    icon: <FaBrain size={48} />,
  },
  {
    slug: "audit",
    title: "Alcohol Use Disorders Identification Test",
    description:
      "Assesses alcohol consumption patterns and related risks to identify potential alcohol use disorders.",
    icon: <FaWineBottle size={48} />,
  },
  {
    slug: "burnout",
    title: "Burnout Self-Assessment",
    description:
      "Evaluates levels of emotional exhaustion, depersonalization, and reduced personal accomplishment related to work or stress.",
    icon: <FaFireAlt size={48} />,
  },
  {
    slug: "depression",
    title: "Depression Self-Assessment",
    description:
      "Screens for symptoms of persistent sadness, loss of interest, and low energy that may indicate depression.",
    icon: <FaRegSadTear size={48} />,
  },
];

const Assessments = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "5rem" }}>
      
      {/* HEADER */}
      <section style={{ textAlign: "center", padding: "4.5rem 1rem" }}>
        <p
          style={{
            color: "#b45309",
            letterSpacing: "2px",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          RECLAIMING YOUR DIGNITY
        </p>

        <h1 style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>
          Self Assessments
        </h1>

        <p
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            lineHeight: 1.7,
            fontSize: "1.05rem",
          }}
        >
          Explore the assessments below to gain meaningful insight into your mental well-being and access supportive, 
          evidence-based resources tailored to your needs. 
          Understanding how you feel is an important first step toward balance, growth, and informed care
            and you do not have to take that step alone.
        </p>
      </section>

      {/* CARDS */}
      <section style={grid}>
        {assessments.map((test) => (
          <div key={test.slug} style={card}>
            
            {/* ICON */}
            <div style={iconWrapper}>{test.icon}</div>

            {/* CONTENT */}
            <div>
              <h3 style={{ marginBottom: "0.75rem" }}>{test.title}</h3>
              <p style={{ lineHeight: 1.7 }}>{test.description}</p>
            </div>

            {/* CTA */}
            <div style={cardFooter}>
              <Link to={`/assessments/${test.slug}`}>
                <button style={cardButton}>
                  Start the Self Assessment Test
                </button>
              </Link>
            </div>

          </div>
        ))}
      </section>
    </div>
  );
};

/* ===== Styles ===== */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
  gap: "2.5rem",
};

const card = {
  backgroundColor: "#075985",
  color: "#ffffff",
  padding: "2.75rem 2.5rem",
  borderRadius: "14px",
  minHeight: "320px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const iconWrapper = {
  marginBottom: "1.5rem",
  color: "#e0f2fe",
};

const cardFooter = {
  marginTop: "2.5rem",
  paddingTop: "1.5rem",
  borderTop: "1px dashed rgba(255,255,255,0.5)",
};

const cardButton = {
  background: "none",
  border: "none",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "0.95rem",
};

export default Assessments;
