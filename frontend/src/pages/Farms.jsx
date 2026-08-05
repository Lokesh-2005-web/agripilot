import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function Farms() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [form, setForm] = useState({
    farmName: "",
    location: "",
    area: "",
    soilType: "Loamy",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    setLoading(true);

    try {
      const res = await api.get("/farms");
      setFarms(res.data.farms || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load farms");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addFarm = async (e) => {
    e.preventDefault();

    setAdding(true);

    try {
      // Convert location to latitude & longitude
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          form.location
        )}&count=1`
      );

      const geoData = await geo.json();

      if (!geoData.results || geoData.results.length === 0) {
        toast.error("Location not found.");
        setAdding(false);
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      await api.post("/farms", {
        farmName: form.farmName,
        location: form.location,
        area: Number(form.area),
        soilType: form.soilType,
        latitude,
        longitude,
      });

      toast.success("Farm added successfully!");

      setForm({
        farmName: "",
        location: "",
        area: "",
        soilType: "Loamy",
        latitude: "",
        longitude: "",
      });

      fetchFarms();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add farm");
    } finally {
      setAdding(false);
    }
  };

  const deleteFarm = async (id) => {
    if (!window.confirm("Delete this farm?")) return;

    try {
      await api.delete(`/farms/${id}`);
      toast.success("Farm deleted successfully!");
      fetchFarms();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete farm");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl font-semibold">
        Loading farms...
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">🌾 Farms</h1>

      <form
        onSubmit={addFarm}
        className="bg-white rounded-xl shadow p-6 mb-8 space-y-4"
      >
        <input
          name="farmName"
          placeholder="Farm Name"
          value={form.farmName}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />

        <input
          name="location"
          placeholder="Location (e.g. Hyderabad, Telangana)"
          value={form.location}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />

        <input
          name="area"
          type="number"
          placeholder="Area (Acres)"
          value={form.area}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />

        <select
          name="soilType"
          value={form.soilType}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        >
          <option value="Clay">Clay</option>
          <option value="Sandy">Sandy</option>
          <option value="Loamy">Loamy</option>
          <option value="Silty">Silty</option>
          <option value="Peaty">Peaty</option>
          <option value="Chalky">Chalky</option>
        </select>

        <button
          type="submit"
          disabled={adding}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded"
        >
          {adding ? "Adding..." : "Add Farm"}
        </button>
      </form>

      {farms.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No farms added yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {farms.map((farm) => (
            <div
              key={farm._id}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-2xl font-bold mb-2">
                {farm.farmName}
              </h2>

              <p>📍 {farm.location}</p>

              <p>🌾 {farm.area} Acres</p>

              <p>🪴 {farm.soilType}</p>

              {farm.latitude && farm.longitude && (
                <>
                  <p>🌍 Latitude: {farm.latitude}</p>
                  <p>🌎 Longitude: {farm.longitude}</p>
                </>
              )}

              <button
                onClick={() => deleteFarm(farm._id)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Farms;