import { useState } from "react";
import { addTask } from "../api/tasks";

function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    try {
      await addTask({
        title,
        description: "",
        priority,
        deadline: deadline || null,
      });

      setTitle("");
      setPriority("Medium");
      setDeadline("");

      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">
        ➕ Add New Task
      </h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Task Title
        </label>

        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Priority
        </label>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Deadline
        </label>

        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Add Task
      </button>
    </form>
  );
}

export default AddTask;