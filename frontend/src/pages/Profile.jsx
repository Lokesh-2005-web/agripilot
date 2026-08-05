import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle, FaEnvelope, FaUser } from "react-icons/fa";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-lg text-white p-8 mb-8">
        <h1 className="text-4xl font-bold">👤 My Profile</h1>
        <p className="mt-2 text-lg opacity-90">
          View your account information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">

        <div className="flex flex-col items-center">

          <FaUserCircle className="text-[120px] text-green-600 mb-4" />

          <h2 className="text-3xl font-bold">
            {user?.name || "User"}
          </h2>

          <p className="text-gray-500 mt-1">
            AgriPilot User
          </p>

        </div>

        <hr className="my-8" />

        <div className="space-y-6">

          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FaUser className="text-green-700 text-xl" />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="text-xl font-semibold">
                {user?.name || "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaEnvelope className="text-blue-700 text-xl" />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email Address</p>
              <p className="text-xl font-semibold break-all">
                {user?.email || "-"}
              </p>
            </div>
          </div>

        </div>

        <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="text-lg font-bold text-green-700 mb-2">
            🌾 AgriPilot
          </h3>

          <p className="text-gray-700">
            Welcome to AgriPilot. Manage your farms, crops,
            weather information and reminders from one place.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Profile;