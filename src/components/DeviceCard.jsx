export default function DeviceCard({ id, percentage, customName }) {
  let bgColor = "#D5F5D5"; // green
  let warningText = "";

  if (percentage >= 60 && percentage < 80) {
    bgColor = "#FFF7C2"; // yellow
  }

  if (percentage >= 80) {
    bgColor = "#FFC9C9"; // red
    warningText = "Please replace the trash bag!";
  }

  return (
    <div
      className="device-card"
      style={{
        background: bgColor,
        padding: "16px",
        borderRadius: "12px",
        marginBottom: "16px",
        border: "1px solid #ccc",
      }}
    >
      <h3>Bin ID: {id}</h3>
      {customName && <h4>Bin Name: {customName}</h4>}

      <div
        className="progress-bar"
        style={{
          height: "16px",
          background: "#eee",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: "#4CAF50",
            transition: "width 0.3s",
          }}
        ></div>
      </div>

      <p style={{ marginTop: "8px" }}>Fullness: {percentage}%</p>

      {warningText && (
        <p style={{ color: "#b30000", fontWeight: "bold" }}>{warningText}</p>
      )}
    </div>
  );
}
