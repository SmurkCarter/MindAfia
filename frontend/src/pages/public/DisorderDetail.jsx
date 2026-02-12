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
      "Anxiety disorders involve excessive fear, worry, or nervousness that is difficult to control and interferes with daily functioning. These conditions may be persistent and disproportionate to actual threats.",
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
      "PTSD may develop after experiencing or witnessing a traumatic event such as violence, accidents, or natural disasters. It involves persistent psychological distress and altered stress responses.",
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
      "Bipolar disorder is a mood disorder marked by alternating episodes of depression and mania or hypomania, affecting mood, energy levels, and behavior.",
    symptoms: [
      "Periods of intense sadness or hopelessness",
      "Episodes of elevated or irritable mood",
      "Impulsive or risky behavior during manic phases",
      "Changes in sleep and activity levels",
      "Difficulty maintaining relationships or routines",
    ],
    assessmentLabel: "Take a Mood Self-Assessment",
  },
};


const DisorderDetail = () => {
  const { slug } = useParams();
  const disorder = disorderData[slug];

  if (!disorder) {
    return <h2>Disorder details coming soon.</h2>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1>{disorder.title}</h1>

      <p style={{ lineHeight: 1.6 }}>{disorder.description}</p>

      <h3>Common Symptoms</h3>
      <ul>
        {disorder.symptoms.map((symptom, index) => (
          <li key={index}>{symptom}</li>
        ))}
      </ul>

      <h3>Treatment & Support</h3>
      <p style={{ lineHeight: 1.6 }}>
        Management often includes psychotherapy, lifestyle support, and in some
        cases medication. Professional evaluation is essential for accurate
        diagnosis and care planning.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <Link to="/assessments">
          <button style={primaryButton}>
            {disorder.assessmentLabel}
          </button>
        </Link>
      </div>
    </div>
  );
};

const primaryButton = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default DisorderDetail;
