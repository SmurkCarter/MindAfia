from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .models import PopulationRiskStat



class PopulationStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        stats = PopulationRiskStat.objects.all()
        data = {
            stat.risk_level: stat.count
            for stat in stats
        }
        total = sum(data.values())

        return Response({
            "total_assessments": total,
            "distribution": data
        })
