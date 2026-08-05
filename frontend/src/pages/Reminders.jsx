import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    reminderDate: "",
  });

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    setLoading(true);

    try {
      const res = await api.get("/reminders");
      setReminders(res.data.reminders || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load reminders");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addReminder = async (e) => {
    e.preventDefault();

    setAdding(true);

    try {
      await api.post("/reminders", form);

      toast.success("Reminder created successfully!");

      setForm({
        title: "",
        description: "",
        reminderDate: "",
      });

      fetchReminders();
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Failed to create reminder"
      );
    } finally {
      setAdding(false);
    }
  };

  const toggleComplete = async (reminder) => {
    try {
      await api.put(`/reminders/${reminder._id}`, {
        completed: !reminder.completed,
      });

      toast.success(
        reminder.completed
          ? "Reminder marked as pending"
          : "Reminder completed!"
      );

      fetchReminders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update reminder");
    }
  };

  const deleteReminder = async (id) => {
    if (!window.confirm("Delete this reminder?")) return;

    try {
      await api.delete(`/reminders/${id}`);
      toast.success("Reminder deleted");
      fetchReminders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete reminder");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl font-semibold">
        Loading reminders...
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">
        🔔 Reminders
      </h1>

      <form
        onSubmit={addReminder}
        className="bg-white shadow rounded-xl p-6 mb-8 space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Reminder Title"
          value={form.title}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <div>
          <label className="font-medium">
            Reminder Date
          </label>

          <input
            type="date"
            name="reminderDate"
            value={form.reminderDate}
            onChange={handleChange}
            className="border p-3 rounded w-full mt-1"
            required
          />
        </div>

        <button
          disabled={adding}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded"
        >
          {adding ? "Adding..." : "Add Reminder"}
        </button>
      </form>
      {reminders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No reminders available.
        </div>
      ) : (
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div
              key={reminder._id}
              className="bg-white shadow rounded-xl p-5 flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {reminder.title}
                </h2>

                <p className="text-gray-700 mt-1">
                  {reminder.description || "No description"}
                </p>

                <p className="text-gray-500 mt-2">
                  📅{" "}
                  {new Date(
                    reminder.reminderDate
                  ).toLocaleDateString()}
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${
                    reminder.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {reminder.completed
                    ? "Completed"
                    : "Pending"}
                </span>
              </div>

              <div className="flex gap-3 mt-5 md:mt-0">
                <button
                  onClick={() => toggleComplete(reminder)}
                  className={`px-4 py-2 rounded text-white transition ${
                    reminder.completed
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {reminder.completed
                    ? "Mark Pending"
                    : "Mark Complete"}
                </button>

                <button
                  onClick={() =>
                    deleteReminder(reminder._id)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Reminders;