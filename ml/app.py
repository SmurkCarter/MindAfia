from fastapi import FastAPI
from services.risk_engine import evaluate_risk
from services.recommender import (
    recommend_treatment,
    recommend_articles,
)
from services.population_stats import (
    update_population_stats,
    get_population_stats,
)

app = FastAPI(title="MindAfia ML Engine")


from fastapi import FastAPI
from services.risk_engine import evaluate_risk
from services.recommender import (
    recommend_treatment,
    recommend_articles,
)
from services.population_stats import (
    update_population_stats,
    get_population_stats,
)

app = FastAPI(title="MindAfia ML Engine")


@app.post("/predict-risk/")
def predict(data: dict):
    risk_data = evaluate_risk(
    assessment_type=data["assessment_type"],
    score=data["score"],
    responses=data["responses"],
    previous_score=data.get("previous_score"),
    previous_assessment=data.get("previous_assessment"),
)


    treatments = recommend_treatment(
        data["assessment_type"],
        data["severity"],
        risk_data["risk_level"],
    )

    articles = recommend_articles(
        data["assessment_type"],
    )

    update_population_stats(risk_data["risk_level"])

    return {
        **risk_data,
        "recommended_treatments": treatments,
        "recommended_articles": articles,
    }


@app.get("/population-stats/")
def stats():
    return get_population_stats()

