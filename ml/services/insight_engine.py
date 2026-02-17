from collections import Counter
import pandas as pd


DATASET_PATH = "dataset.csv"


def get_most_rampant_conditions():
    try:
        df = pd.read_csv(DATASET_PATH)

        counts = Counter(df["risk_label"])

        return counts

    except:
        return {}
