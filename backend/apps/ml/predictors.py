# lightweight ML inference endpoints inside Django
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def risk_score(request):
    # request.data expected: {"text": "..."} or {"features": {...}}
    text = request.data.get("text", "")
    # Dummy scoring for skeleton (replace with real model loading)
    score = min(1.0, len(text) / 1000.0)
    return Response({"risk_score": score})
