export default function ActivitySection({
  vendorType,
}: {
  vendorType: string;
}) {
  // Dynamic activities based on vendor type
  const getActivities = () => {
    switch (vendorType) {
      case "pandit":
        return [
          {
            time: "10:30 AM",
            text: "New booking - Sharma Ji",
            status: "pending",
          },
          {
            time: "09:15 AM",
            text: "Pooja completed - Gupta family",
            status: "completed",
          },
          {
            time: "08:00 AM",
            text: "Client added - Verma Ji",
            status: "success",
          },
        ];
      case "ambulance":
        return [
          {
            time: "10:30 AM",
            text: "Emergency trip assigned",
            status: "pending",
          },
          {
            time: "09:15 AM",
            text: "Trip completed - City Hospital",
            status: "completed",
          },
          {
            time: "08:00 AM",
            text: "Driver reported for duty",
            status: "success",
          },
        ];
      default:
        return [
          { time: "10:30 AM", text: "New job assigned", status: "pending" },
          { time: "09:15 AM", text: "Job completed", status: "completed" },
          {
            time: "08:00 AM",
            text: "Team member checked in",
            status: "success",
          },
        ];
    }
  };

  const activities = getActivities();

  return (
    <div>
      <h3 style={{ margin: "0 0 16px", color: "#333" }}>
        {vendorType === "pandit"
          ? "Recent Bookings"
          : vendorType === "ambulance"
            ? "Recent Trips"
            : "Recent Activity"}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {activities.map((activity, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              background: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#666", minWidth: "60px" }}>
              {activity.time}
            </span>
            <span style={{ flex: 1, color: "#333" }}>{activity.text}</span>
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                background:
                  activity.status === "completed"
                    ? "#22c55e20"
                    : activity.status === "pending"
                      ? "#f59e0b20"
                      : "#3b82f620",
                color:
                  activity.status === "completed"
                    ? "#22c55e"
                    : activity.status === "pending"
                      ? "#f59e0b"
                      : "#3b82f6",
              }}
            >
              {activity.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
