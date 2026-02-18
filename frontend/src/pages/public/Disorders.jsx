import { Link } from "react-router-dom";

const disorders = [
  {
    slug: "adhd",
    name: "ADHD",
    icon: "⚡",
    summary:
      "Attention-Deficit/Hyperactivity Disorder affects focus, impulsivity, and self-regulation.",
  },
  {
    slug: "depression",
    name: "Depression",
    icon: "🌧️",
    summary:
      "A mood disorder characterized by persistent sadness, loss of interest, and low energy.",
  },
  {
    slug: "anxiety",
    name: "Anxiety Disorders",
    icon: "💭",
    summary:
      "Conditions involving excessive fear, worry, or nervousness that interfere with daily life.",
  },
  {
    slug: "ptsd",
    name: "Post-Traumatic Stress Disorder (PTSD)",
    icon: "🛡️",
    summary:
      "Triggered by experiencing or witnessing trauma, leading to intrusive memories and heightened stress responses.",
  },
  {
    slug: "bipolar",
    name: "Bipolar Disorder",
    icon: "🔄",
    summary:
      "Characterized by alternating episodes of depression and mania or hypomania.",
  },
];

const Disorders = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="disorders-hero">
        <div className="container">
          <h1>Mental Health Disorders</h1>
          <p>
            Learn about common mental health disorders, their symptoms, and
            available support options. Understanding is the first step toward care.
          </p>
        </div>
      </section>

      {/* DISORDERS GRID */}
      <section className="disorders-section">
        <div className="container disorders-grid">
          {disorders.map((disorder) => (
            <div key={disorder.slug} className="disorder-card">
              <div className="disorder-icon">{disorder.icon}</div>

              <h3>{disorder.name}</h3>
              <p>{disorder.summary}</p>

              <Link to={`/disorders/${disorder.slug}`} className="learn-btn">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Disorders;
