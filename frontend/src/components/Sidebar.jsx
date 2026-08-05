import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaSeedling,
  FaTractor,
  FaBell,
  FaUser,
  FaCloudSun,
  FaRobot,
  FaFilePdf,
  FaCalendarAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Farms",
      path: "/farms",
      icon: <FaTractor />,
    },
    {
      name: "Crops",
      path: "/crops",
      icon: <FaSeedling />,
    },
    {
      name: "Weather",
      path: "/weather",
      icon: <FaCloudSun />,
    },
    {
      name: "AI Recommendation",
      path: "/recommendation",
      icon: <FaRobot />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaFilePdf />,
    },
    {
      name: "Harvest Prediction",
      path: "/harvest",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Reminders",
      path: "/reminders",
      icon: <FaBell />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-green-700 text-white p-6">
      <h1 className="text-3xl font-bold mb-10">
        🌱 AgriPilot
      </h1>

      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-green-900"
                : "hover:bg-green-600"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;