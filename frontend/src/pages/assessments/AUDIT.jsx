import { useState } from "react";
import api from "../../services/api";
import { auditQuestions, auditOptions } from "../../data/assessments/audit";

const AUDIT = () => {

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelect = (questionIndex, value) => {

    setAnswers({
      ...answers,
      [questionIndex]: value
    });

  };

  const calculateScore = () => {

    return Object.values(answers).reduce((a, b) => a + b, 0);

  };

  const handleSubmit = async () => {

    if (Object.keys(answers).length !== auditQuestions.length) {
      alert("Please answer all questions.");
      return;
    }

    const score = calculateScore();

    try {

      const payload = {
        assessment: 3, // AUDIT ID
        responses: answers
      };

      const response = await api.post("/assessments/submit/", payload);

      setResult({
        score: response.data.total_score,
        risk_level: response.data.risk_level,
        recommended_articles: response.data.recommended_articles,
        recommended_treatments: response.data.recommended_treatments
      });

      setSubmitted(true);

    } catch (error) {

      console.error("Submission error:", error.response?.data);
      alert("Failed to submit assessment");

    }

  };

  if (submitted && result) {

    return (

      <div className="assessment-result">

        <div className="result-card">

          <h2>AUDIT Results</h2>

          <h3>Score: {result.score}</h3>

          <p>Risk Level: {result.risk_level}</p>

          <h4>Recommended Articles</h4>

          <ul>
            {result.recommended_articles?.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>

          <h4>Recommended Treatments</h4>

          <ul>
            {result.recommended_treatments?.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

        </div>

      </div>

    );

  }

  return (

    <div className="assessment-container">

      <h1>AUDIT Alcohol Assessment</h1>

      {auditQuestions.map((question, index) => (

        <div key={index} className="question-card">

          <p>{index + 1}. {question}</p>

          <div className="options">

            {auditOptions.map((option) => (

              <label key={option.value} className="option-item">

                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option.value}
                  onChange={() => handleSelect(index, option.value)}
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

export default AUDIT;