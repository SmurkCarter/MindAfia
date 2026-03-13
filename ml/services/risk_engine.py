import os
from models.risk_model import load_model


# ===============================
# BASE RISK RULES
# ===============================

def determine_base_risk(score, assessment_type):

    # -----------------------------
    # PHQ9
    # -----------------------------
    if assessment_type == "PHQ9":
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

    # -----------------------------
    # GAD7
    # -----------------------------
    if assessment_type == "GAD7":
        if score <= 4:
            return "Low"
        elif score <= 9:
            return "Low"
        elif score <= 14:
            return "Moderate"
        else:
            return "High"

    # -----------------------------
    # AUDIT
    # -----------------------------
    if assessment_type == "AUDIT":
        if score <= 7:
            return "Low"
        elif score <= 15:
            return "Moderate"
        elif score <= 19:
            return "High"
        else:
            return "High"

    # -----------------------------
    # BURNOUT
    # -----------------------------
    if assessment_type == "BURNOUT":
        if score <= 10:
            return "Low"
        elif score <= 17:
            return "Moderate"
        else:
            return "High"

    return "Low"


# ===============================
# RISK ESCALATION
# ===============================

def upgrade_risk_level(risk):

    levels = ["Low", "Moderate", "High", "Critical"]

    if risk in levels and levels.index(risk) < len(levels) - 1:
        return levels[levels.index(risk) + 1]

    return risk


# ===============================
# HYBRID ML + RULE ENGINE
# ===============================

def evaluate_risk(
    assessment_type,
    score,
    responses,
    previous_score=None,
    previous_assessment=None
):

    risk_flags = []
    explanation = []

    # ===============================
    # 1️⃣ ML Prediction (if model exists)
    # ===============================

    model = load_model()

    if model:
        try:

            feature_row = {
                "score": score,
                "previous_score": previous_score or 0
            }

            ml_prediction = model.predict([list(feature_row.values())])[0]

            risk_level = ml_prediction
            explanation.append("Risk predicted using trained ML model.")

        except Exception as e:

            print("ML failed, falling back to rule engine:", e)
            risk_level = determine_base_risk(score, assessment_type)

    else:

        risk_level = determine_base_risk(score, assessment_type)


    # ===============================
    # 2️⃣ CLINICAL SAFETY OVERRIDES
    # ===============================

    # Suicide override (PHQ9 question 9)
    if assessment_type == "PHQ9":

        q9 = responses.get("8", 0)  # question index 8 (0-based)

        if q9 >= 2:
            risk_level = "High"
            risk_flags.append("suicide_risk")
            explanation.append("Suicidal ideation detected.")


    # Rapid deterioration
    if previous_score:

        if score - previous_score >= 5:
            risk_level = upgrade_risk_level(risk_level)
            risk_flags.append("rapid_deterioration")
            explanation.append("Rapid increase in symptoms.")


    # Comorbidity escalation
    if previous_assessment:

        if (
            assessment_type != previous_assessment["type"]
            and score >= 10
            and previous_assessment["score"] >= 10
        ):
            risk_level = upgrade_risk_level(risk_level)
            risk_flags.append("comorbidity_detected")
            explanation.append(
                "Multiple mental health risk indicators detected."
            )


    # Default explanation
    if not explanation:
        explanation.append("Risk determined from symptom severity.")


    return {
        "risk_level": risk_level,
        "risk_flags": risk_flags,
        "explanation": " ".join(explanation),
    }