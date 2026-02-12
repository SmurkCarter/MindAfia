import { Link } from "react-router-dom";

const disorders = [
  {
    slug: "adhd",
    name: "ADHD",
    summary:
      "Attention-Deficit/Hyperactivity Disorder affects focus, impulsivity, and self-regulation.",
  },
  {
    slug: "depression",
    name: "Depression",
    summary:
      "A mood disorder characterized by persistent sadness, loss of interest, and low energy.",
  },
  {
    slug: "anxiety",
    name: "Anxiety Disorders",
    summary:
      "Conditions involving excessive fear, worry, or nervousness that interfere with daily life.",
  },
  {
    slug: "ptsd",
    name: "Post-Traumatic Stress Disorder (PTSD)",
    summary:
      "A condition triggered by experiencing or witnessing a traumatic event, leading to intrusive memories and heightened stress responses.",
  },
  {
    slug: "bipolar",
    name: "Bipolar Disorder",
    summary:
      "A mood disorder characterized by alternating episodes of depression and mania or hypomania.",
  },
];

const Disorders = () => {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <h1>Mental Health Disorders</h1>

      <p style={{ maxWidth: "700px", lineHeight: 1.6 }}>
        Learn about common mental health disorders, their symptoms, and available
        support options. Understanding is the first step towards care.
      </p>

      <div style={grid}>
        {disorders.map((disorder) => (
          <div key={disorder.slug} style={card}>
            <h3>{disorder.name}</h3>
            <p>{disorder.summary}</p>

            <Link to={`/disorders/${disorder.slug}`}>
              <button style={linkButton}>Learn More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "2rem",
  marginTop: "2rem",
};

const card = {
  padding: "1.5rem",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
};

const linkButton = {
  marginTop: "1rem",
  background: "none",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
  padding: 0,
};

export default Disorders;
