from rest_framework import serializers
from .models import Assessment, AssessmentResult
from .scoring import score_phq9, score_gad7


class AssessmentSubmissionSerializer(serializers.Serializer):
    assessment_type = serializers.ChoiceField(
        choices=[Assessment.PHQ9, Assessment.GAD7]
    )
    responses = serializers.DictField(
        child=serializers.IntegerField(min_value=0, max_value=3)
    )

    def validate(self, data):
        expected = 9 if data["assessment_type"] == Assessment.PHQ9 else 7

        if len(data["responses"]) != expected:
            raise serializers.ValidationError(
                f"Expected {expected} questions."
            )

        return data

    def create(self, validated_data):
        request = self.context["request"]

        assessment = Assessment.objects.get(
            name=validated_data["assessment_type"]
        )

        # Score calculation
        if assessment.name == Assessment.PHQ9:
            total, severity = score_phq9(validated_data["responses"])
        else:
            total, severity = score_gad7(validated_data["responses"])

        # Create assessment result (ML fields will be filled later)
        return AssessmentResult.objects.create(
            patient=request.user,
            assessment=assessment,
            responses=validated_data["responses"],
            total_score=total,
            severity=severity,
        )


# 🔥 FULL READ SERIALIZER (Now Includes ML Intelligence Fields)

class AssessmentResultReadSerializer(serializers.ModelSerializer):
    assessment = serializers.StringRelatedField()
    patient = serializers.CharField(
        source="patient.username",
        read_only=True
    )

    class Meta:
        model = AssessmentResult
        fields = [
            "id",
            "assessment",
            "patient",
            "responses",
            "total_score",
            "severity",

            # 🔥 ML Intelligence Fields
            "risk_level",
            "risk_flags",
            "explanation",
            "recommended_treatments",
            "recommended_articles",

            "created_at",
        ]

        read_only_fields = fields
