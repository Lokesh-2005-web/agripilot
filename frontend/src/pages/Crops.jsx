import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function Crops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [uploadingId, setUploadingId] = useState(null);

  const [form, setForm] = useState({
    cropName: "",
    variety: "",
    area: "",
    season: "Kharif",
    sowingDate: "",
    expectedHarvestDate: "",
  });

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    setLoading(true);

    try {
      const res = await api.get("/crops");
      setCrops(res.data.crops || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load crops");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addCrop = async (e) => {
    e.preventDefault();

    setAdding(true);

    try {
      await api.post("/crops", {
        ...form,
        area: Number(form.area),
      });

      toast.success("Crop added successfully!");

      setForm({
        cropName: "",
        variety: "",
        area: "",
        season: "Kharif",
        sowingDate: "",
        expectedHarvestDate: "",
      });

      fetchCrops();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create crop");
    } finally {
      setAdding(false);
    }
  };

  const deleteCrop = async (id) => {
    if (!window.confirm("Delete this crop?")) return;

    try {
      await api.delete(`/crops/${id}`);
      toast.success("Crop deleted successfully!");
      fetchCrops();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete crop");
    }
  };

  const uploadImage = async (id, file) => {
    try {
      setUploadingId(id);

      const formData = new FormData();
      formData.append("image", file);

      await api.post(`/crops/${id}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Image uploaded successfully!");
      fetchCrops();
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setUploadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl font-semibold">
        Loading crops...
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">🌱 Crops</h1>

      <form
        onSubmit={addCrop}
        className="bg-white rounded-xl shadow p-6 mb-8 space-y-4"
      >
        <input
          type="text"
          name="cropName"
          placeholder="Crop Name"
          value={form.cropName}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        <input
          type="text"
          name="variety"
          placeholder="Variety"
          value={form.variety}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        <input
          type="number"
          name="area"
          placeholder="Area (Acres)"
          value={form.area}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        <select
          name="season"
          value={form.season}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        >
          <option value="Kharif">Kharif</option>
          <option value="Rabi">Rabi</option>
          <option value="Zaid">Zaid</option>
        </select>

        <input
          type="date"
          name="sowingDate"
          value={form.sowingDate}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        <input
          type="date"
          name="expectedHarvestDate"
          value={form.expectedHarvestDate}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        <button
          disabled={adding}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded"
        >
          {adding ? "Adding..." : "Add Crop"}
        </button>
      </form>
      {crops.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No crops added yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <div
              key={crop._id}
              className="bg-white rounded-xl shadow p-6"
            >
              {crop.image ? (
                <img
                  src={crop.image}
                  alt={crop.cropName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4 text-gray-500">
                  No Image Available
                </div>
              )}

              <h2 className="text-2xl font-bold mb-3">
                {crop.cropName}
              </h2>

              <div className="space-y-1 text-gray-700">
                <p>
                  <strong>Variety:</strong> {crop.variety}
                </p>

                <p>
                  <strong>Area:</strong> {crop.area} Acres
                </p>

                <p>
                  <strong>Season:</strong> {crop.season}
                </p>

                <p>
                  <strong>Sowing:</strong>{" "}
                  {new Date(crop.sowingDate).toLocaleDateString()}
                </p>

                <p>
                  <strong>Harvest:</strong>{" "}
                  {new Date(
                    crop.expectedHarvestDate
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium mb-2">
                  Upload Crop Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="w-full border rounded p-2"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      uploadImage(crop._id, e.target.files[0]);
                    }
                  }}
                />

                {uploadingId === crop._id && (
                  <p className="text-blue-600 text-sm mt-2">
                    Uploading image...
                  </p>
                )}
              </div>

              <button
                onClick={() => deleteCrop(crop._id)}
                className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
              >
                Delete Crop
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Crops;