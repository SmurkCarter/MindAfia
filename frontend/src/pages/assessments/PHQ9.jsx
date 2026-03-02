import { useState, useEffect } from "react";
import { phq9Questions, phq9Options } from "../../data/assessments/phq9";
import api from "../../services/api";

export default function PHQ9() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assessmentId, setAssessmentId] = useState(null);

  // 🔥 Fetch PHQ9 ID from backend
  useEffect(() => {
    const fetchAssessmentId = async () => {
      try {
        const res = await api.get("assessments/");
        const phq = res.data.find(a => a.name === "PHQ-9");
        if (phq) {
          setAssessmentId(phq.id);
        }
      } catch (err) {
        console.error("Failed to load assessments:", err);
      }
    };

    fetchAssessmentId();
  }, []);

  const handleSelect = (questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: parseInt(value)
    }));
  };

  const handleSubmit = async () => {
    if (!assessmentId) {
      alert("Assessment not loaded yet.");
      return;
    }

    if (Object.keys(answers).length !== phq9Questions.length) {
      alert("Please answer all questions.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("assessments/submit/", {
        assessment: assessmentId,  // ✅ CORRECT FIELD
        responses: answers
      });

      console.log("SUCCESS RESPONSE:", response.data);
      setResult(response.data);

    } catch (error) {
      console.log("ERROR DATA:", error.response?.data);
      alert("Submission failed.");
    }

    setLoading(false);
  };

  const resetAssessment = () => {
    setAnswers({});
    setResult(null);
  };

  // ================= RESULT VIEW =================
  if (result) {
    return (
      <div className="assessment-result">
        <div className="result-card">
          <h2>PHQ-9 Results</h2>

          <h3>Score: {result.score}</h3>
          <p>{result.severity}</p>

          <p><strong>Risk Level:</strong> {result.risk_level}</p>

          {result.risk_level === "High" && (
            <div className="risk-alert">
              ⚠ High Risk Detected — Clinician notified.
            </div>
          )}

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

          <button onClick={resetAssessment}>Take Again</button>
        </div>
      </div>
    );
  }

  // ================= FORM VIEW =================
  return (
    <div className="assessment-container">
      <h1>PHQ-9 (Depression Assessment)</h1>

      {phq9Questions.map((question, index) => (
        <div key={index} className="question-card">
          <p>{index + 1}. {question}</p>

          <div className="options">
            {phq9Options.map(option => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={`question-${index}`}
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

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Assessment"}
      </button>
    </div>
  );
}