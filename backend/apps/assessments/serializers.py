from rest_framework import serializers
from .models import Assessment, AssessmentResult
from .scoring import (
    score_phq9,
    score_gad7,
    score_audit,
    score_burnout
)


class AssessmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assessment
        fields = ["id", "name"]


class AssessmentSubmissionSerializer(serializers.Serializer):

    assessment = serializers.PrimaryKeyRelatedField(
        queryset=Assessment.objects.all()
    )

    responses = serializers.DictField(
        child=serializers.IntegerField(min_value=0, max_value=4)
    )

    def validate(self, data):

        assessment = data["assessment"]
        responses = data["responses"]

        assessment_name = assessment.name.replace("-", "").upper()

        # Expected question counts
        if assessment_name == "PHQ9":
            expected = 9

        elif assessment_name == "GAD7":
            expected = 7

        elif assessment_name == "AUDIT":
            expected = 10

        elif assessment_name == "BURNOUT":
            expected = 7

        else:
            raise serializers.ValidationError("Unknown assessment.")

        if len(responses) != expected:
            raise serializers.ValidationError(
                f"Expected {expected} questions."
            )

        return data


    def create(self, validated_data):

        request = self.context["request"]
        assessment = validated_data["assessment"]
        responses = validated_data["responses"]

        assessment_name = assessment.name.replace("-", "").upper()

        # Scoring
        if assessment_name == "PHQ9":
            total, severity = score_phq9(responses)

        elif assessment_name == "GAD7":
            total, severity = score_gad7(responses)

        elif assessment_name == "AUDIT":
            total, severity = score_audit(responses)

        elif assessment_name == "BURNOUT":
            total, severity = score_burnout(responses)

        result = AssessmentResult.objects.create(
            patient=request.user,
            assessment=assessment,
            responses=responses,
            total_score=total,
            severity=severity,
        )

        return result


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

            "risk_level",
            "risk_flags",
            "explanation",
            "recommended_treatments",
            "recommended_articles",

            "created_at",
        ]

        read_only_fields = fields