import pandas as pd


def build_feature_row(data):
    """
    Converts incoming assessment JSON to ML feature vector
    """
    assessment_type = data["assessment_type"]
    responses = data["responses"]

    feature_row = {}

    # Encode assessment type
    feature_row["is_phq9"] = 1 if assessment_type == "PHQ-9" else 0
    feature_row["is_gad7"] = 1 if assessment_type == "GAD-7" else 0

    # Add question scores
    for key, value in responses.items():
        feature_row[key] = value

    feature_row["total_score"] = data["score"]
    feature_row["previous_score"] = data.get("previous_score", 0)

    return pd.DataFrame([feature_row])
