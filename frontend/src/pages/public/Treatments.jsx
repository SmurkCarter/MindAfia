import {
  FaHeadSideVirus,
  FaShieldAlt,
  FaHandsHelping,
} from "react-icons/fa";

import TreatmentCard from "../../components/cards/TreatmentCard";

const Treatments = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "5rem" }}>
      
      {/* HEADER */}
      <section style={{ textAlign: "center", padding: "4.5rem 1rem" }}>
        <h1 style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>
          Our Treatment Approach
        </h1>

        <p
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            lineHeight: 1.7,
            fontSize: "1.05rem",
          }}
        >
          MindAfya is designed to support mental health assessment, guided care,
          and recovery through evidence-based digital tools. The system helps
          individuals understand their mental health status and supports recovery
          through curative, preventive, and promotive treatment approaches.
        </p>
      </section>

      {/* TREATMENT CARDS */}
      <section style={grid}>
        <TreatmentCard
          title="Curative Treatment"
          description="Focuses on identifying and managing existing mental health conditions through professional evaluation, therapy, medication support, and structured rehabilitation."
          icon={<FaHeadSideVirus size={42} />}
          highlighted
        />

        <TreatmentCard
          title="Preventive Treatment"
          description="Aims to reduce the risk of mental health challenges through early screening, stress management, lifestyle guidance, and resilience-building strategies."
          icon={<FaShieldAlt size={42} />}
        />

        <TreatmentCard
          title="Promotive Treatment"
          description="Encourages positive mental well-being through awareness, healthy lifestyle practices, social connection, and community-based psychological support."
          icon={<FaHandsHelping size={42} />}
        />
      </section>

      {/* FOOTER TEXT */}
      <p
        style={{
          textAlign: "center",
          marginTop: "3.5rem",
          color: "#4b5563",
          fontSize: "0.95rem",
        }}
      >
        We offer <strong>Curative</strong>, <strong>Preventive</strong>, and{" "}
        <strong>Promotive</strong> treatments, each designed to support healing,
        resilience, and long-term mental well-being.
      </p>
    </div>
  );
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
  gap: "2.8rem",
};

export default Treatments;
