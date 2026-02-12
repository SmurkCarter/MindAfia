const TreatmentCard = ({
  title,
  description,
  icon,
  highlighted = false,
}) => {
  return (
    <div
      style={{
        backgroundColor: highlighted ? "#f1eee1" : "#ffffff",
        border: "1px solid #d1d5db",
        borderRadius: "22px",
        padding: "2.8rem",
        minHeight: "340px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Icon */}
      <div style={{ marginBottom: "1.5rem", color: "#7c5c2b" }}>
        {icon}
      </div>

      {/* Content */}
      <div>
        <h3 style={{ marginBottom: "1rem" }}>{title}</h3>
        <p style={{ lineHeight: 1.7 }}>{description}</p>
      </div>

      {/* CTA */}
      <div style={{ marginTop: "2rem", fontWeight: "600", color: "#2563eb" }}>
        Learn more →
      </div>
    </div>
  );
};

export default TreatmentCard;
