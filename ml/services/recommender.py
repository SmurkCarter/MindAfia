def recommend_treatment(assessment_type, severity, risk_level):

    # Normalize names
    assessment_type = assessment_type.upper()

    # ---------------------------
    # PHQ9
    # ---------------------------
    if assessment_type == "PHQ9":

        if risk_level in ["High", "Critical"]:
            return [
                "Cognitive Behavioral Therapy",
                "Psychiatric evaluation",
                "Medication management",
            ]

        return [
            "Behavioral activation",
            "Guided self-help therapy",
        ]

    # ---------------------------
    # GAD7
    # ---------------------------
    if assessment_type == "GAD7":

        if risk_level == "High":
            return [
                "CBT for anxiety",
                "Exposure therapy",
                "Medication consultation",
            ]

        return [
            "Relaxation therapy",
            "Mindfulness training",
        ]

    # ---------------------------
    # AUDIT
    # ---------------------------
    if assessment_type == "AUDIT":

        if risk_level == "High":
            return [
                "Motivational interviewing",
                "Substance use counseling",
                "Addiction treatment program",
            ]

        return [
            "Alcohol reduction counseling",
            "Lifestyle change coaching",
        ]

    # ---------------------------
    # BURNOUT
    # ---------------------------
    if assessment_type == "BURNOUT":

        return [
            "Stress management therapy",
            "Work-life balance counseling",
            "Mindfulness therapy",
        ]

    # Default fallback
    return [
        "Consult a mental health professional"
    ]


def recommend_articles(assessment_type):

    assessment_type = assessment_type.upper()

    if assessment_type == "PHQ9":
        return [
            "Understanding Depression",
            "How to Cope With Depression",
        ]

    if assessment_type == "GAD7":
        return [
            "Understanding Anxiety Disorders",
            "Breathing Techniques for Anxiety",
        ]

    if assessment_type == "AUDIT":
        return [
            "Understanding Alcohol Use Disorder",
            "How to Reduce Alcohol Intake",
        ]

    if assessment_type == "BURNOUT":
        return [
            "What Is Burnout Syndrome",
            "Recovering From Workplace Burnout",
        ]

    return [
        "Mental Health Self-Care Guide"
    ]