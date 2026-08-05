import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Farms from "./pages/Farms";
import Crops from "./pages/Crops";
import Weather from "./pages/Weather";
import Recommendation from "./pages/Recommendation";
import Reports from "./pages/Reports";
import Harvest from "./pages/Harvest";
import Reminders from "./pages/Reminders";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/farms" element={<Farms />} />

        <Route path="/crops" element={<Crops />} />

        <Route path="/weather" element={<Weather />} />

        <Route
          path="/recommendation"
          element={<Recommendation />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/harvest"
          element={<Harvest />}
        />

        <Route
          path="/reminders"
          element={<Reminders />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Route>

      {/* 404 */}

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;