import { useState } from "react";
import Question from "../components/ui/Question";
import { phq9Questions, phq9Options } from "../data/assessments/phq9";


const PHQ9 = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const totalScore = Object.values(answers).reduce(
    (sum, val) => sum + val,
    0
  );

  const getResult = () => {
    if (totalScore <= 4) return "Minimal symptoms";
    if (totalScore <= 9) return "Mild symptoms";
    if (totalScore <= 14) return "Moderate symptoms";
    if (totalScore <= 19) return "Moderately severe symptoms";
    return "Severe symptoms";
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "4rem" }}>
      <h1>Depression Self-Assessment (PHQ-9)</h1>

      <p>
        Over the last two weeks, how often have you been bothered by the
        following problems?
      </p>

      {!submitted &&
        phq9Questions.map((q, index) => (
          <Question
            key={index}
            text={q}
            options={phq9Options}
            onAnswer={(value) => handleAnswer(index, value)}
          />
        ))}

      {!submitted && (
        <button
          className="btn-primary"
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length !== phq9Questions.length}
        >
          View Results
        </button>
      )}

      {submitted && (
        <div className="card" style={{ marginTop: "2rem" }}>
          <h2>Your Result</h2>S
          <p>
            Score: <strong>{totalScore}</strong>
          </p>
          <p>
            Interpretation: <strong>{getResult()}</strong>
          </p>

          <p style={{ marginTop: "1rem" }}>
            This screening tool is not a diagnosis. If your symptoms are
            affecting your daily life, consider speaking with a qualified
            mental health professional.
          </p>
        </div>
      )}
    </div>
  );
};

export default PHQ9;
