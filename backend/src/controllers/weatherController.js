const axios = require("axios");
const Farm = require("../models/farm");

const getWeather = async (req, res) => {
    try {
        const farm = await Farm.findOne({
            _id: req.params.farmId,
            user: req.user.id,
        });

        if (!farm) {
            return res.status(404).json({
                success: false,
                message: "Farm not found",
            });
        }

        const latitude = farm.latitude;
        const longitude = farm.longitude;

        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

        const response = await axios.get(url);

        const weather = response.data.current;

        res.status(200).json({
            success: true,
            farm: farm.farmName,
            weather,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getWeather,
};