export default function StatsCards({
  stats,
  themeColor,
}: {
  stats: any[];
  themeColor: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {stats?.map((stat, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <div>
              <p style={{ color: "#666", fontSize: "14px", margin: "0 0 8px" }}>
                {stat.title}
              </p>
              <h3 style={{ fontSize: "24px", margin: 0, color: "#333" }}>
                {stat.value}
              </h3>
            </div>
            {stat.icon && <span style={{ fontSize: "24px" }}>{stat.icon}</span>}
          </div>

          {stat.change !== undefined && (
            <p
              style={{
                margin: "12px 0 0",
                color:
                  stat.change > 0
                    ? "#22c55e"
                    : stat.change < 0
                      ? "#ef4444"
                      : "#666",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {stat.change > 0 ? "↑" : stat.change < 0 ? "↓" : "→"}
              {Math.abs(stat.change)}% from last month
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
