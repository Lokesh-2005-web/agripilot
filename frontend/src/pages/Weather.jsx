import { useEffect, useState } from "react";
import api from "../services/api";

function Weather() {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState("");
  const [weather, setWeather] = useState(null);
  const [farmName, setFarmName] = useState("");

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    try {
      const res = await api.get("/farms");

      setFarms(res.data.farms || []);

      if (res.data.farms.length > 0) {
        setSelectedFarm(res.data.farms[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWeather = async () => {
    if (!selectedFarm) return;

    try {
      const res = await api.get(`/weather/${selectedFarm}`);

      setWeather(res.data.weather);
      setFarmName(res.data.farm);
    } catch (err) {
      console.error(err);
      alert("Unable to fetch weather.");
    }
  };

  useEffect(() => {
    if (selectedFarm) {
      fetchWeather();
    }
  }, [selectedFarm]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">
        🌦 Weather
      </h1>

      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <label className="font-semibold">
          Select Farm
        </label>

        <select
          value={selectedFarm}
          onChange={(e) =>
            setSelectedFarm(e.target.value)
          }
          className="border rounded p-3 w-full mt-2"
        >
          {farms.map((farm) => (
            <option key={farm._id} value={farm._id}>
              {farm.farmName}
            </option>
          ))}
        </select>
      </div>

      {weather && (
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-3xl font-bold mb-6">
            {farmName}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-blue-100 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold">
                🌡 Temperature
              </h3>

              <p className="text-3xl font-bold mt-2">
                {weather.temperature_2m}°C
              </p>
            </div>

            <div className="bg-green-100 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold">
                💧 Humidity
              </h3>

              <p className="text-3xl font-bold mt-2">
                {weather.relative_humidity_2m}%
              </p>
            </div>

            <div className="bg-yellow-100 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold">
                🌬 Wind Speed
              </h3>

              <p className="text-3xl font-bold mt-2">
                {weather.wind_speed_10m} km/h
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Weather;