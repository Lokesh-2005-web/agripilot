import { useEffect, useState } from "react";
import {
  FaCloudSun,
  FaTint,
  FaWater,
  FaBolt,
  FaSeedling,
  FaRobot,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import DashboardCharts from "../components/DashboardCharts";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalFarms: 0,
    totalCrops: 0,
    totalReminders: 0,
    pendingReminders: 0,
    completedReminders: 0,
    borewell: {
      depth: 0,
      waterLevel: 0,
      motor: "Healthy",
    },
  });

  const [loading, setLoading] = useState(true);

  const weather = {
    temperature: 31,
    humidity: 72,
    rainChance: 65,
    wind: 14,
    condition: "Partly Cloudy",
  };

  const irrigation = {
    status: "Scheduled",
    next: "Tomorrow 06:00 AM",
    waterUsed: 850,
  };

  const pump = {
    status: "Running",
    hours: "4.5 hrs",
  };

  const soil = {
    moisture: "42%",
    type: "Loamy",
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await api.get("/dashboard");
      setDashboard(res.data.dashboard);
    } catch (e) {
      toast.error("Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading Smart Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold">
          🌾 AgriPilot Smart Irrigation System
        </h1>

        <p className="mt-3 text-lg">
          Monitor irrigation, weather, borewell health and water usage from one dashboard.
        </p>
      </div>

      {/* Dashboard Cards */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Weather */}

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaCloudSun className="text-yellow-500 text-3xl" />
            <h2 className="font-bold text-xl">Weather</h2>
          </div>

          <p>Temperature : {weather.temperature}°C</p>
          <p>Humidity : {weather.humidity}%</p>
          <p>Rain Chance : {weather.rainChance}%</p>
          <p>Wind : {weather.wind} km/h</p>
          <p>{weather.condition}</p>
        </div>

        {/* Irrigation */}

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaTint className="text-blue-500 text-3xl" />
            <h2 className="font-bold text-xl">Irrigation</h2>
          </div>

          <p>Status : {irrigation.status}</p>
          <p>Next : {irrigation.next}</p>
          <p>Today's Water : {irrigation.waterUsed} L</p>
        </div>

        {/* Borewell */}

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaWater className="text-cyan-600 text-3xl" />
            <h2 className="font-bold text-xl">Borewell</h2>
          </div>

          <p>
            <strong>Depth :</strong> {dashboard.borewell?.depth} ft
          </p>

          <p>
            <strong>Water Level :</strong> {dashboard.borewell?.waterLevel} ft
          </p>

          <p>
            <strong>Motor :</strong> {dashboard.borewell?.motor}
          </p>
        </div>

        {/* Pump */}

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaBolt className="text-orange-500 text-3xl" />
            <h2 className="font-bold text-xl">Pump</h2>
          </div>

          <p>Status : {pump.status}</p>
          <p>Running Hours : {pump.hours}</p>
        </div>

        {/* Soil */}

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaSeedling className="text-green-600 text-3xl" />
            <h2 className="font-bold text-xl">Soil</h2>
          </div>

          <p>Soil Type : {soil.type}</p>
          <p>Moisture : {soil.moisture}</p>

          <hr className="my-3" />

          <p>Total Farms : {dashboard.totalFarms}</p>
          <p>Total Crops : {dashboard.totalCrops}</p>
          <p>Pending Reminders : {dashboard.pendingReminders}</p>
          <p>Completed Reminders : {dashboard.completedReminders}</p>
        </div>

        {/* AI Recommendation */}

        <div className="bg-white rounded-xl shadow p-6 border-l-8 border-green-600">
          <div className="flex items-center gap-3 mb-4">
            <FaRobot className="text-green-700 text-3xl" />
            <h2 className="font-bold text-xl">
              AI Recommendation
            </h2>
          </div>

          <div className="text-lg font-medium text-green-700">
            🌧 Rain is expected within 24 hours.
          </div>

          <div className="mt-3">
            Recommendation:
          </div>

          <div className="font-bold text-red-600">
            Skip irrigation today to conserve water.
          </div>
        </div>

      </div>

      <DashboardCharts dashboard={dashboard} />

    </div>
  );
}

export default Dashboard;