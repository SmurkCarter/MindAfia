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


def score_audit(responses: dict):

    total = sum(responses.values())

    if total <= 7:
        severity = "Low risk drinking"
    elif total <= 15:
        severity = "Hazardous drinking"
    elif total <= 19:
        severity = "Harmful drinking"
    else:
        severity = "Possible alcohol dependence"

    return total, severity


def score_burnout(responses: dict):

    total = sum(responses.values())

    if total <= 10:
        severity = "Low burnout risk"
    elif total <= 17:
        severity = "Moderate burnout risk"
    else:
        severity = "High burnout risk"

    return total, severity