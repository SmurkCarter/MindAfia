const Question = ({ text, options, onAnswer }) => {
  return (
    <div className="card" style={{ marginBottom: "1.5rem" }}>
      <p style={{ fontWeight: 600 }}>{text}</p>

      {options.map((opt) => (
        <label key={opt.value} style={{ display: "block", marginTop: "0.5rem" }}>
          <input
            type="radio"
            name={text}
            onChange={() => onAnswer(opt.value)}
          />{" "}
          {opt.label}
        </label>
      ))}
    </div>
  );
};

export default Question;
