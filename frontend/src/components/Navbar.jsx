import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-green-700">
          Welcome, {user?.name}
        </h2>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
      >
        Logout
      </button>
    </header>
  );
}

export default Navbar;