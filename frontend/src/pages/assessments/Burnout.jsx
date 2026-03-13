import { useState } from "react";
import api from "../../services/api";
import { burnoutQuestions, burnoutOptions } from "../../data/assessments/burnout";

const Burnout = () => {

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (questionIndex, value) => {

    setAnswers({
      ...answers,
      [questionIndex]: parseInt(value)
    });

  };

  const handleSubmit = async () => {

    if (Object.keys(answers).length !== burnoutQuestions.length) {
      alert("Please answer all questions.");
      return;
    }

    setLoading(true);

    try {

      const response = await api.post("/assessments/submit/", {
        assessment: 4,
        responses: answers
      });

      setResult(response.data);
      setSubmitted(true);

    } catch (error) {

      console.error(error);
      alert("Submission failed");

    }

    setLoading(false);

  };

  if (submitted && result) {

    return (

      <div className="assessment-result">

        <div className="result-card">

          <h2>Burnout Results</h2>

          <h3>Score: {result.total_score}</h3>

          <p>{result.severity}</p>

          <p><strong>Risk Level:</strong> {result.risk_level}</p>

          {Array.isArray(result.recommended_articles) &&
            result.recommended_articles.length > 0 && (

              <div>

                <h3>Recommended Articles</h3>

                <ul>
                  {result.recommended_articles.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>

              </div>

          )}

          {Array.isArray(result.recommended_treatments) &&
            result.recommended_treatments.length > 0 && (

              <div>

                <h3>Recommended Treatments</h3>

                <ul>
                  {result.recommended_treatments.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>

              </div>

          )}

          <button onClick={() => {
            setAnswers({});
            setResult(null);
            setSubmitted(false);
          }}>
            Take Again
          </button>

        </div>

      </div>

    );

  }

  return (

    <div className="assessment-container">

      <h1>Burnout Assessment</h1>

      {burnoutQuestions.map((question, index) => (

        <div key={index} className="question-card">

          <p>{index + 1}. {question}</p>

          <div className="options">

            {burnoutOptions.map((option) => (

              <label key={option.value}>

                <input
                  type="radio"
                  name={`q-${index}`}
                  value={option.value}
                  checked={answers[index] === option.value}
                  onChange={() => handleSelect(index, option.value)}
                />

                {option.label}

              </label>

            ))}

          </div>

        </div>

      ))}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Assessment"}
      </button>

    </div>

  );

};

export default Burnout;