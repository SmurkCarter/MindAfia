import joblib
import os
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

MODEL_PATH = "models/risk_model.pkl"


def train_model(dataset_path="dataset.csv"):
    df = pd.read_csv(dataset_path)

    X = df.drop("risk_label", axis=1)
    y = df["risk_label"]

    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=10,
        random_state=42
    )

    model.fit(X, y)

    joblib.dump(model, MODEL_PATH)

    return model


def load_model():
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    return None
