import { useState } from "react";
import { phq9Questions, phq9Options } from "../../data/assessments/phq9";

const PHQ9 = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: value,
    });
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((a, b) => a + b, 0);
  };

  const getSeverity = (score) => {
    if (score <= 4) return "Minimal Depression";
    if (score <= 9) return "Mild Depression";
    if (score <= 14) return "Moderate Depression";
    if (score <= 19) return "Moderately Severe Depression";
    return "Severe Depression";
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== phq9Questions.length) {
      alert("Please answer all questions.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    const score = calculateScore();
    const severity = getSeverity(score);

    const isHighRisk = score >= 15;

    return (
      <div className="assessment-result">
        <div className="result-card">
          <h2>PHQ-9 Results</h2>
          <h3>Score: {score}</h3>
          <p>{severity}</p>

          {isHighRisk && (
            <div className="risk-alert">
              ⚠ High Risk Detected — Clinician will be notified.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="assessment-container">
      <h1>PHQ-9 (Depression Assessment)</h1>

      {phq9Questions.map((question, index) => (
        <div key={index} className="question-card">
          <p>{index + 1}. {question}</p>

          <div className="options">
            {phq9Options.map((option) => (
              <label key={option.value} className="option-item">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option.value}
                  onChange={() =>
                    handleSelect(index, option.value)
                  }
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Assessment
      </button>
    </div>
  );
};

export default PHQ9;
