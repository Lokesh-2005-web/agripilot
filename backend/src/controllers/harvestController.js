const Crop = require("../models/crop");

const harvestDays = {
  rice: 120,
  wheat: 120,
  maize: 90,
  cotton: 180,
  sugarcane: 365,
  groundnut: 110,
};

const getHarvestPrediction = async (req, res) => {
  try {
    const { cropId } = req.body;

    const crop = await Crop.findOne({
      _id: cropId,
      user: req.user.id,
    });

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    const cropName = crop.cropName.toLowerCase();

    const duration = harvestDays[cropName] || 120;

    const sowingDate = new Date(crop.sowingDate);

    const harvestDate = new Date(sowingDate);
    harvestDate.setDate(harvestDate.getDate() + duration);

    const today = new Date();

    const totalDays = duration;

    const elapsedDays = Math.max(
      0,
      Math.floor((today - sowingDate) / (1000 * 60 * 60 * 24))
    );

    const remainingDays = Math.max(
      0,
      Math.floor((harvestDate - today) / (1000 * 60 * 60 * 24))
    );

    const progress = Math.min(
      100,
      Math.round((elapsedDays / totalDays) * 100)
    );

    res.status(200).json({
      success: true,
      crop: crop.cropName,
      sowingDate: crop.sowingDate,
      harvestDate,
      remainingDays,
      progress,
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
  getHarvestPrediction,
};