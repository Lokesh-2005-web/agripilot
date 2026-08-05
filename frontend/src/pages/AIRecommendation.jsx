import { useState } from "react";
import api from "../services/api";

function AIRecommendation() {
  const [form, setForm] = useState({
    crop: "",
    soilType: "Loamy",
    temperature: "",
    humidity: "",
    weather: "",
  });

  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getRecommendation = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/recommendation", {
        crop: form.crop,
        soilType: form.soilType,
        temperature: Number(form.temperature),
        humidity: Number(form.humidity),
        weather: form.weather,
      });

      setRecommendation(res.data.recommendation);
    } catch (err) {
      console.error(err);
      alert("Failed to generate recommendation");
    }

    setLoading(false);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">
        🤖 AI Recommendation
      </h1>

      <form
        onSubmit={getRecommendation}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        <input
          name="crop"
          placeholder="Crop Name"
          value={form.crop}
          onChange={handleChange}
          className="border rounded p-3 w-full"
          required
        />

        <select
          name="soilType"
          value={form.soilType}
          onChange={handleChange}
          className="border rounded p-3 w-full"
        >
          <option>Clay</option>
          <option>Sandy</option>
          <option>Loamy</option>
          <option>Silty</option>
          <option>Peaty</option>
          <option>Chalky</option>
        </select>

        <input
          type="number"
          name="temperature"
          placeholder="Temperature (°C)"
          value={form.temperature}
          onChange={handleChange}
          className="border rounded p-3 w-full"
          required
        />

        <input
          type="number"
          name="humidity"
          placeholder="Humidity (%)"
          value={form.humidity}
          onChange={handleChange}
          className="border rounded p-3 w-full"
          required
        />

        <input
          name="weather"
          placeholder="Weather (Sunny / Rainy / Cloudy)"
          value={form.weather}
          onChange={handleChange}
          className="border rounded p-3 w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
        >
          {loading
            ? "Generating..."
            : "Get AI Recommendation"}
        </button>
      </form>

      {recommendation && (
        <div className="bg-white shadow rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Recommendation
          </h2>

          <pre className="whitespace-pre-wrap">
            {recommendation}
          </pre>
        </div>
      )}
    </>
  );
}

export default AIRecommendation;