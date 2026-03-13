import { useState } from "react";
import api from "../../services/api";
import { gad7Questions, gad7Options } from "../../data/assessments/gad7";

const GAD7 = () => {

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

    if (Object.keys(answers).length !== gad7Questions.length) {
      alert("Please answer all questions.");
      return;
    }

    setLoading(true);

    try {

      const response = await api.post("/assessments/submit/", {
        assessment: 2,
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

          <h2>GAD-7 Results</h2>

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

      <h1>GAD-7 Anxiety Assessment</h1>

      {gad7Questions.map((question, index) => (

        <div key={index} className="question-card">

          <p>{index + 1}. {question}</p>

          <div className="options">

            {gad7Options.map((option) => (

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

export default GAD7;