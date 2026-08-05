import { useState } from "react";
import axios from "axios";
import "./Recommendation.css";

const Recommendation = () => {
  const [formData, setFormData] = useState({
    crop: "",
    soilType: "Loamy",
    temperature: "",
    humidity: "",
    weather: "",
  });

  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/recommendation",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecommendation(res.data.recommendation);
    } catch (err) {
      console.error(err);
      alert("Failed to generate recommendation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommendation-container">
      <h1>🤖 AI Recommendation</h1>

      <form onSubmit={handleSubmit} className="recommendation-form">
        <input
          type="text"
          name="crop"
          placeholder="Crop Name"
          value={formData.crop}
          onChange={handleChange}
          required
        />

        <select
          name="soilType"
          value={formData.soilType}
          onChange={handleChange}
        >
          <option>Loamy</option>
          <option>Clayey</option>
          <option>Sandy</option>
        </select>

        <input
          type="number"
          name="temperature"
          placeholder="Temperature (°C)"
          value={formData.temperature}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="humidity"
          placeholder="Humidity (%)"
          value={formData.humidity}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="weather"
          placeholder="Weather (Sunny / Rainy / Cloudy)"
          value={formData.weather}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Get AI Recommendation"}
        </button>
      </form>

      {recommendation && (
        <div className="recommendation-card">
          <h2>Recommendation</h2>

          <div className="recommendation-box">
            {recommendation.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendation;