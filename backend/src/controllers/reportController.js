const PDFDocument = require("pdfkit");
const Farm = require("../models/farm");
const Crop = require("../models/crop");

const generateReport = async (req, res) => {
  try {
    const { farmId, cropId } = req.body;

    const farm = await Farm.findOne({
      _id: farmId,
      user: req.user.id,
    });

    const crop = await Crop.findOne({
      _id: cropId,
      user: req.user.id,
    });

    if (!farm || !crop) {
      return res.status(404).json({
        success: false,
        message: "Farm or Crop not found",
      });
    }

    const doc = new PDFDocument({
      margin: 50,
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=AgriPilot_Report.pdf"
    );

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    doc.pipe(res);

    // ==================================================
    // TITLE
    // ==================================================

    doc
      .fontSize(26)
      .fillColor("#166534")
      .text("AGRIPILOT FARM REPORT", {
        align: "center",
      });

    doc.moveDown(0.5);

    doc
      .fontSize(11)
      .fillColor("gray")
      .text(
        `Generated on: ${new Date().toLocaleString()}`,
        {
          align: "center",
        }
      );

    doc.moveDown();

    doc
      .strokeColor("#16a34a")
      .lineWidth(2)
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke();

    doc.moveDown();

    // ==================================================
    // FARM DETAILS
    // ==================================================

    doc
      .fontSize(18)
      .fillColor("#15803d")
      .text("Farm Details");

    doc.moveDown(0.5);

    doc
      .fontSize(13)
      .fillColor("black");

    doc.text(`Farm Name      : ${farm.farmName}`);
    doc.text(`Location       : ${farm.location}`);
    doc.text(`Area           : ${farm.area} Acres`);
    doc.text(`Soil Type      : ${farm.soilType}`);

    doc.moveDown();

    // ==================================================
    // CROP DETAILS
    // ==================================================

    doc
      .fontSize(18)
      .fillColor("#15803d")
      .text("Crop Details");

    doc.moveDown(0.5);

    doc
      .fontSize(13)
      .fillColor("black");

    doc.text(`Crop Name      : ${crop.cropName}`);
    doc.text(`Season         : ${crop.season}`);
    doc.text(`Crop Area      : ${crop.area} Acres`);
    doc.text(`Sowing Date    : ${new Date(crop.sowingDate).toDateString()}`);

    doc.moveDown();

    // ==================================================
    // AI RECOMMENDATIONS
    // ==================================================

    doc
      .fontSize(18)
      .fillColor("#15803d")
      .text("Smart Recommendations");

    doc.moveDown(0.5);

    doc
      .fontSize(13)
      .fillColor("black");

    doc.text("• Maintain proper soil moisture.");
    doc.text("• Irrigate during early morning or evening.");
    doc.text("• Apply balanced NPK fertilizer.");
    doc.text("• Inspect crops weekly for pests.");
    doc.text("• Avoid waterlogging after rainfall.");

    doc.moveDown();

    // ==================================================
    // FARM HEALTH
    // ==================================================

    doc
      .fontSize(18)
      .fillColor("#15803d")
      .text("Farm Health Summary");

    doc.moveDown(0.5);

    doc
      .fontSize(13)
      .fillColor("black");

    doc.text("Overall Health : Excellent");
    doc.text("Estimated Productivity : High");
    doc.text("Risk Level : Low");

    doc.moveDown(2);

    doc
      .strokeColor("#16a34a")
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke();

    doc.moveDown();

    doc
      .fontSize(12)
      .fillColor("gray")
      .text(
        "Generated automatically by AgriPilot Smart Farming System",
        {
          align: "center",
        }
      );

    doc.end();

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateReport,
};