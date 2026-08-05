const getRecommendation = async (req, res) => {
    try {
      const {
        crop,
        soilType,
        temperature,
        humidity,
        weather,
      } = req.body;
  
      let irrigation = "";
      let fertilizer = "";
      let pest = "";
      let advice = "";
  
      // ---------------- Crop Rules ----------------
  
      switch (crop.toLowerCase()) {
        case "rice":
          irrigation =
            "Maintain 2–5 cm standing water during the growing period.";
          fertilizer =
            "Apply Nitrogen in 3 split doses along with Phosphorus and Potassium.";
          pest =
            "Watch for stem borer, leaf folder and blast disease.";
          break;
  
        case "wheat":
          irrigation =
            "Irrigate at CRI, tillering, flowering and grain filling stages.";
          fertilizer =
            "Apply balanced NPK fertilizer.";
          pest =
            "Monitor for rust and aphids.";
          break;
  
        case "maize":
          irrigation =
            "Provide irrigation every 7–10 days depending on rainfall.";
          fertilizer =
            "Use Nitrogen-rich fertilizer in split applications.";
          pest =
            "Inspect for fall armyworm.";
          break;
  
        case "cotton":
          irrigation =
            "Avoid overwatering. Irrigate every 8–10 days.";
          fertilizer =
            "Apply Potassium-rich fertilizer during flowering.";
          pest =
            "Check for bollworm and whiteflies.";
          break;
  
        default:
          irrigation =
            "Maintain adequate soil moisture.";
          fertilizer =
            "Use balanced NPK fertilizer based on soil test.";
          pest =
            "Inspect crops regularly for pests.";
      }
  
      // ---------------- Soil ----------------
  
      if (soilType.toLowerCase() === "sandy") {
        advice +=
          "Sandy soil drains water quickly. Irrigate more frequently. ";
      }
  
      if (soilType.toLowerCase() === "clayey") {
        advice +=
          "Clayey soil retains water well. Avoid over-irrigation. ";
      }
  
      if (soilType.toLowerCase() === "loamy") {
        advice +=
          "Loamy soil is ideal for most crops. Maintain balanced irrigation. ";
      }
  
      // ---------------- Temperature ----------------
  
      if (temperature > 35) {
        advice +=
          "High temperature detected. Increase irrigation and avoid fertilizer during peak afternoon. ";
      }
  
      if (temperature < 15) {
        advice +=
          "Low temperature may slow crop growth. Monitor seedlings carefully. ";
      }
  
      // ---------------- Humidity ----------------
  
      if (humidity > 80) {
        advice +=
          "High humidity increases fungal disease risk. Monitor crops regularly. ";
      }
  
      if (humidity < 40) {
        advice +=
          "Low humidity may stress plants. Ensure adequate irrigation. ";
      }
  
      // ---------------- Weather ----------------
  
      if (weather.toLowerCase() === "rainy") {
        advice +=
          "Rain expected. Reduce irrigation and check for waterlogging. ";
      }
  
      if (weather.toLowerCase() === "sunny") {
        advice +=
          "Sunny weather is suitable for photosynthesis. Irrigate during morning or evening. ";
      }
  
      if (weather.toLowerCase() === "cloudy") {
        advice +=
          "Cloudy weather may reduce evaporation. Adjust irrigation accordingly. ";
      }
  
      // ---------------- Health Score ----------------
  
      let score = 100;
  
      if (temperature > 35 || temperature < 15) score -= 20;
  
      if (humidity > 85) score -= 15;
  
      if (soilType.toLowerCase() === "sandy") score -= 5;
  
      if (weather.toLowerCase() === "rainy") score -= 10;
  
      let health;
  
      if (score >= 90) {
        health = "🟢 Excellent";
      } else if (score >= 75) {
        health = "🟡 Good";
      } else if (score >= 60) {
        health = "🟠 Moderate";
      } else {
        health = "🔴 Poor";
      }
  
      const recommendation = `
  🌱 AI Crop Recommendation
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  🌾 Crop
  ${crop}
  
  🌍 Soil
  ${soilType}
  
  🌡 Temperature
  ${temperature}°C
  
  💧 Humidity
  ${humidity}%
  
  ☀ Weather
  ${weather}
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  💦 Irrigation
  ${irrigation}
  
  🌿 Fertilizer
  ${fertilizer}
  
  🐛 Pest Control
  ${pest}
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  🏥 Farm Health
  ${health}
  
  📊 Health Score
  ${score}/100
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  ✅ General Advice
  ${advice}
  `;
  
      res.status(200).json({
        success: true,
        recommendation,
      });
  
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: "Unable to generate recommendation",
      });
    }
  };
  
  module.exports = {
    getRecommendation,
  };