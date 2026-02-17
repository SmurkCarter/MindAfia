import os
from models.risk_model import load_model


# ===============================
# RULE-BASED BASE RISK
# ===============================

def determine_base_risk(score, assessment_type):

    if assessment_type == "PHQ-9":
        if score <= 4:
            return "Low"
        elif score <= 9:
            return "Low"
        elif score <= 14:
            return "Moderate"
        elif score <= 19:
            return "High"
        else:
            return "Critical"

    if assessment_type == "GAD-7":
        if score <= 4:
            return "Low"
        elif score <= 9:
            return "Low"
        elif score <= 14:
            return "Moderate"
        else:
            return "High"


def upgrade_risk_level(risk):
    levels = ["Low", "Moderate", "High", "Critical"]
    if risk in levels and levels.index(risk) < len(levels) - 1:
        return levels[levels.index(risk) + 1]
    return risk


# ===============================
# HYBRID ENGINE
# ===============================

def evaluate_risk(
    assessment_type,
    score,
    responses,
    previous_score=None,
    previous_assessment=None
):

    flags = []
    explanation = []

    # ===============================
    # 1️⃣ Try ML First
    # ===============================

    model = load_model()

    if model:
        try:
            feature_row = build_feature_row({
                "assessment_type": assessment_type,
                "responses": responses,
                "score": score,
                "previous_score": previous_score or 0
            })

            ml_prediction = model.predict(feature_row)[0]

            risk_level = ml_prediction
            explanation.append("Predicted using trained ML model.")

        except Exception as e:
            print("ML failed. Falling back to rules:", e)
            risk_level = determine_base_risk(score, assessment_type)
    else:
        risk_level = determine_base_risk(score, assessment_type)

    # ===============================
    # 2️⃣ Clinical Safety Overrides
    # ===============================

    # Suicide override (cannot be overridden by ML)
    if assessment_type == "PHQ-9":
        if responses.get("q9", 0) >= 2:
            risk_level = "High"
            flags.append("suicide_risk")
            explanation.append("Active suicidal ideation detected.")

    # Rapid escalation
    if previous_score:
        if score - previous_score >= 5:
            risk_level = upgrade_risk_level(risk_level)
            flags.append("rapid_deterioration")
            explanation.append("Rapid increase in symptoms.")

    # Comorbidity escalation
    if previous_assessment:
        if (
            assessment_type != previous_assessment["type"]
            and score >= 10
            and previous_assessment["score"] >= 10
        ):
            risk_level = upgrade_risk_level(risk_level)
            flags.append("comorbid_anxiety_depression")
            explanation.append("Comorbid anxiety and depression symptoms.")

    if not explanation:
        explanation.append("Risk based on symptom severity.")

    return {
        "risk_level": risk_level,
        "flags": flags,
        "explanation": " ".join(explanation),
    }
