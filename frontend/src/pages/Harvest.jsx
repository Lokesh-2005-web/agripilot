import { useEffect, useState } from "react";
import api from "../services/api";

function Harvest() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    loadCrops();
  }, []);

  const loadCrops = async () => {
    try {
      const res = await api.get("/crops");

      setCrops(res.data.crops || []);

      if (res.data.crops.length > 0) {
        setSelectedCrop(res.data.crops[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const predictHarvest = async () => {
    try {
      const res = await api.post("/harvest", {
        cropId: selectedCrop,
      });

      setPrediction(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to predict harvest.");
    }
  };

  useEffect(() => {
    if (selectedCrop) {
      predictHarvest();
    }
  }, [selectedCrop]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">
        🌾 Harvest Prediction
      </h1>

      <div className="bg-white shadow rounded-xl p-6 mb-8">

        <label className="font-semibold">
          Select Crop
        </label>

        <select
          value={selectedCrop}
          onChange={(e) =>
            setSelectedCrop(e.target.value)
          }
          className="border rounded p-3 w-full mt-2"
        >
          {crops.map((crop) => (
            <option key={crop._id} value={crop._id}>
              {crop.cropName}
            </option>
          ))}
        </select>

      </div>

      {prediction && (
        <div className="bg-white rounded-xl shadow p-8">

          <h2 className="text-3xl font-bold mb-6">
            {prediction.crop}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-green-100 rounded-lg p-6">
              <h3 className="font-bold">
                🌱 Sowing Date
              </h3>

              <p className="mt-2">
                {new Date(prediction.sowingDate).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-blue-100 rounded-lg p-6">
              <h3 className="font-bold">
                🌾 Harvest Date
              </h3>

              <p className="mt-2">
                {new Date(prediction.harvestDate).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-yellow-100 rounded-lg p-6">
              <h3 className="font-bold">
                ⏳ Remaining Days
              </h3>

              <p className="mt-2 text-2xl">
                {prediction.remainingDays}
              </p>
            </div>

            <div className="bg-purple-100 rounded-lg p-6">
              <h3 className="font-bold">
                📈 Crop Progress
              </h3>

              <p className="mt-2 text-2xl">
                {prediction.progress}%
              </p>

              <div className="w-full bg-gray-300 rounded-full h-4 mt-4">
                <div
                  className="bg-green-600 h-4 rounded-full"
                  style={{
                    width: `${prediction.progress}%`,
                  }}
                />
              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default Harvest;