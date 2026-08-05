import { useEffect, useState } from "react";
import api from "../services/api";

function Reports() {
  const [farms, setFarms] = useState([]);
  const [crops, setCrops] = useState([]);

  const [farmId, setFarmId] = useState("");
  const [cropId, setCropId] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const farmRes = await api.get("/farms");
      const cropRes = await api.get("/crops");

      setFarms(farmRes.data.farms || []);
      setCrops(cropRes.data.crops || []);

      if (farmRes.data.farms.length > 0) {
        setFarmId(farmRes.data.farms[0]._id);
      }

      if (cropRes.data.crops.length > 0) {
        setCropId(cropRes.data.crops[0]._id);
      }
    } catch (err) {
      console.error(err);
      alert("Unable to load data.");
    }
  };

  const downloadReport = async () => {
    try {
      const response = await api.post(
        "/report",
        {
          farmId,
          cropId,
        },
        {
          responseType: "blob",
        }
      );

      const file = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(file);

      const link = document.createElement("a");

      link.href = url;
      link.download = "AgriPilot_Report.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (err) {
      console.error(err);
      alert("Failed to generate report.");
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">
        📄 Reports
      </h1>

      <div className="bg-white rounded-xl shadow p-8 space-y-6">

        <div>
          <label className="font-semibold">
            Select Farm
          </label>

          <select
            value={farmId}
            onChange={(e) => setFarmId(e.target.value)}
            className="border p-3 rounded w-full mt-2"
          >
            {farms.map((farm) => (
              <option key={farm._id} value={farm._id}>
                {farm.farmName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">
            Select Crop
          </label>

          <select
            value={cropId}
            onChange={(e) => setCropId(e.target.value)}
            className="border p-3 rounded w-full mt-2"
          >
            {crops.map((crop) => (
              <option key={crop._id} value={crop._id}>
                {crop.cropName}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={downloadReport}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
        >
          Download PDF Report
        </button>

      </div>
    </>
  );
}

export default Reports;