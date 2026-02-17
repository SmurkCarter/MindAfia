import pandas as pd
import os

DATASET_PATH = "dataset.csv"


def append_to_dataset(data, prediction):
    row = {
        "is_phq9": 1 if data["assessment_type"] == "PHQ-9" else 0,
        "is_gad7": 1 if data["assessment_type"] == "GAD-7" else 0,
        **data["responses"],
        "total_score": data["score"],
        "previous_score": data.get("previous_score", 0),
        "risk_label": prediction
    }

    df = pd.DataFrame([row])

    if os.path.exists(DATASET_PATH):
        df.to_csv(DATASET_PATH, mode="a", header=False, index=False)
    else:
        df.to_csv(DATASET_PATH, index=False)
