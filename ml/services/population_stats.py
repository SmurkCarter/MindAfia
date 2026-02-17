from collections import Counter

global_stats = {
    "total_assessments": 0,
    "risk_distribution": Counter(),
}


def update_population_stats(risk_level):
    global_stats["total_assessments"] += 1
    global_stats["risk_distribution"][risk_level] += 1


def get_population_stats():
    return global_stats
