export default function ChartWidget({
  vendorType,
  themeColor,
}: {
  vendorType: string;
  themeColor: string;
}) {
  // Different chart data based on vendor type
  const getChartData = () => {
    switch (vendorType) {
      case "pandit":
        return { data: [40, 65, 85, 55, 70, 45, 90], label: "Bookings" };
      case "ambulance":
        return { data: [30, 45, 60, 55, 70, 40, 50], label: "Trips" };
      default:
        return { data: [50, 60, 45, 70, 55, 65, 40], label: "Jobs" };
    }
  };

  const { data, label } = getChartData();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div>
      <h3 style={{ margin: "0 0 16px", color: "#333" }}>
        {vendorType === "pandit"
          ? "Weekly Bookings Overview"
          : vendorType === "ambulance"
            ? "Weekly Trips Overview"
            : "Weekly Performance"}
      </h3>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
          height: "150px",
        }}
      >
        {data.map((value, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${value}px`,
                background: themeColor,
                borderRadius: "4px 4px 0 0",
                opacity: 0.7,
                transition: "height 0.3s",
              }}
            />
            <span style={{ fontSize: "12px", marginTop: "8px", color: "#666" }}>
              {days[i]}
            </span>
          </div>
        ))}
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "16px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Total {label}: {data.reduce((a, b) => a + b, 0)}
      </p>
    </div>
  );
}
