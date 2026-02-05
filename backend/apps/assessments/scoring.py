def score_phq9(responses: dict):
    total = sum(responses.values())

    if total <= 4:
        severity = "Minimal depression"
    elif total <= 9:
        severity = "Mild depression"
    elif total <= 14:
        severity = "Moderate depression"
    elif total <= 19:
        severity = "Moderately severe depression"
    else:
        severity = "Severe depression"

    return total, severity


def score_gad7(responses: dict):
    total = sum(responses.values())

    if total <= 4:
        severity = "Minimal anxiety"
    elif total <= 9:
        severity = "Mild anxiety"
    elif total <= 14:
        severity = "Moderate anxiety"
    else:
        severity = "Severe anxiety"

    return total, severity
