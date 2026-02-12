from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict

app = FastAPI(title="MindAfia ML Service")


class AssessmentInput(BaseModel):
    assessment_type: str
    responses: Dict[str, int]


@app.post("/predict-risk/")
def predict_risk(data: AssessmentInput):

    total_score = sum(data.responses.values())

    if data.assessment_type == "PHQ-9":
        if total_score >= 20:
            risk = "High"
        elif total_score >= 10:
            risk = "Moderate"
        else:
            risk = "Low"
    else:
        risk = "Moderate"

    return {
        "total_score": total_score,
        "risk_level": risk,
        "recommendation": "Immediate clinician review required"
        if risk == "High"
        else "Routine follow-up"
    }
