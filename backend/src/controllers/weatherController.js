const axios = require("axios");
const Farm = require("../models/farm");

const getWeather = async (req, res) => {
  try {
    const farm = await Farm.findOne({
      _id: req.params.farmId,
      user: req.user.id,
    });

    console.log("Farm:", farm);

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    console.log("Latitude:", farm.latitude);
    console.log("Longitude:", farm.longitude);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${farm.latitude}&longitude=${farm.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    console.log("URL:", url);

    const response = await axios.get(url);

    console.log("OpenMeteo Response:", response.data);

    res.status(200).json({
      success: true,
      farm: farm.farmName,
      weather: response.data.current,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getWeather,
};