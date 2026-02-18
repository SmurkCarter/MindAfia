import { useParams, Link } from "react-router-dom";

const disorderData = {
  adhd: {
    title: "Attention-Deficit / Hyperactivity Disorder (ADHD)",
    description:
      "ADHD is a neurodevelopmental disorder that affects attention, impulse control, and activity levels. It can impact children, adolescents, and adults, often continuing across the lifespan.",
    symptoms: [
      "Difficulty sustaining attention",
      "Impulsivity and acting without thinking",
      "Restlessness or hyperactivity",
      "Disorganization and forgetfulness",
    ],
    assessmentLabel: "Take an ADHD Self-Assessment",
  },

  depression: {
    title: "Depressive Disorders",
    description:
      "Depression is a mood disorder characterized by persistent feelings of sadness, loss of interest or pleasure, and reduced energy. It can affect how a person thinks, feels, and functions in daily life.",
    symptoms: [
      "Persistent sadness or emptiness",
      "Loss of interest in previously enjoyed activities",
      "Fatigue or low energy",
      "Feelings of worthlessness or excessive guilt",
      "Difficulty concentrating or making decisions",
      "Changes in sleep or appetite",
    ],
    assessmentLabel: "Take a Depression Self-Assessment (PHQ-9)",
  },

  anxiety: {
    title: "Anxiety Disorders",
    description:
      "Anxiety disorders involve excessive fear, worry, or nervousness that is difficult to control and interferes with daily functioning.",
    symptoms: [
      "Excessive or uncontrollable worry",
      "Restlessness or feeling on edge",
      "Rapid heartbeat or shortness of breath",
      "Muscle tension",
      "Difficulty concentrating",
      "Sleep disturbances",
    ],
    assessmentLabel: "Take an Anxiety Self-Assessment (GAD-7)",
  },

  ptsd: {
    title: "Post-Traumatic Stress Disorder (PTSD)",
    description:
      "PTSD may develop after experiencing or witnessing a traumatic event such as violence, accidents, or disasters.",
    symptoms: [
      "Intrusive memories or flashbacks",
      "Avoidance of trauma-related reminders",
      "Negative changes in mood or thinking",
      "Heightened alertness or reactivity",
    ],
    assessmentLabel: "Take a PTSD Self-Assessment",
  },

  bipolar: {
    title: "Bipolar Disorder",
    description:
      "Bipolar disorder is a mood disorder marked by alternating episodes of depression and mania or hypomania.",
    symptoms: [
      "Periods of intense sadness or hopelessness",
      "Episodes of elevated or irritable mood",
      "Impulsive or risky behavior",
      "Changes in sleep and activity levels",
      "Difficulty maintaining routines",
    ],
    assessmentLabel: "Take a Mood Self-Assessment",
  },
};

const DisorderDetail = () => {
  const { slug } = useParams();
  const disorder = disorderData[slug];

  if (!disorder) {
    return (
      <div className="detail-container">
        <h2>Disorder details coming soon.</h2>
      </div>
    );
  }

  return (
    <div className="detail-page">

      {/* HERO */}
      <section className="detail-hero">
        <div className="detail-hero-content">
          <h1>{disorder.title}</h1>
          <p>{disorder.description}</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="detail-content">

        {/* Symptoms Card */}
        <div className="detail-card">
          <h2>Common Symptoms</h2>
          <ul className="symptoms-list">
            {disorder.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>

        {/* Treatment Card */}
        <div className="detail-card">
          <h2>Treatment & Support</h2>
          <p>
            Management often includes psychotherapy, lifestyle support, and
            in some cases medication. Professional evaluation is essential
            for accurate diagnosis and care planning.
          </p>
        </div>

        {/* CTA */}
        <div className="detail-cta">
          <Link to="/assessments" className="detail-btn">
            {disorder.assessmentLabel}
          </Link>
        </div>

      </section>
    </div>
  );
};

export default DisorderDetail;
