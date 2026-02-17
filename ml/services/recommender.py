def recommend_treatment(assessment_type, severity, risk_level):
    treatments = []

    if assessment_type == "PHQ-9":
        if risk_level in ["High", "Critical"]:
            treatments.append("Urgent psychiatric evaluation")
            treatments.append("Crisis intervention therapy")
        elif "Moderate" in severity:
            treatments.append("Cognitive Behavioral Therapy (CBT)")
            treatments.append("SSRI medication consultation")
        else:
            treatments.append("Lifestyle modification")
            treatments.append("Psychoeducation")

    if assessment_type == "GAD-7":
        if risk_level == "High":
            treatments.append("CBT for anxiety")
            treatments.append("Anxiolytic medication consultation")
        else:
            treatments.append("Relaxation therapy")
            treatments.append("Stress management")

    return treatments


def recommend_articles(assessment_type):
    if assessment_type == "PHQ-9":
        return [
            "Understanding Depression",
            "How CBT Treats Depression",
        ]

    if assessment_type == "GAD-7":
        return [
            "Managing Anxiety",
            "Breathing Techniques for Anxiety",
        ]

    return []
