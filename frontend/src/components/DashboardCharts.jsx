import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
  } from "recharts";
  
  const COLORS = ["#16a34a", "#22c55e", "#86efac", "#facc15"];
  
  export default function DashboardCharts({ dashboard }) {
    const farmData = [
      {
        name: "Farms",
        value: dashboard.totalFarms,
      },
      {
        name: "Crops",
        value: dashboard.totalCrops,
      },
    ];
  
    const reminderData = [
      {
        name: "Pending",
        value: dashboard.pendingReminders,
      },
      {
        name: "Completed",
        value: dashboard.completedReminders,
      },
    ];
  
    return (
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
  
        {/* Farm Statistics */}
  
        <div className="bg-white rounded-xl shadow-lg p-6">
  
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            📊 Farm Statistics
          </h2>
  
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={farmData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="value"
                fill="#16a34a"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
  
        </div>
  
        {/* Reminder Status */}
  
        <div className="bg-white rounded-xl shadow-lg p-6">
  
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            ⏰ Reminder Status
          </h2>
  
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
  
              <Pie
                data={reminderData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {reminderData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
  
              <Tooltip />
  
              <Legend />
  
            </PieChart>
          </ResponsiveContainer>
  
        </div>
  
      </div>
    );
  }