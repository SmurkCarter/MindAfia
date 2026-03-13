import { FaExclamationTriangle } from "react-icons/fa";

const RiskAlert = ({ patients }) => {

  const highRisk = patients.filter(p => p.risk === "High");

  if (highRisk.length === 0) return null;

  return (

    <div className="alert-card">

      <FaExclamationTriangle />

      <div>
        <strong>High Risk Alert:</strong>{" "}
        {highRisk.map(p => p.name).join(", ")}
      </div>

    </div>

  );

};

export default RiskAlert;