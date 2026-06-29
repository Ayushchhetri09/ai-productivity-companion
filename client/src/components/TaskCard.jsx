import{ useState } from "react";

import { deleteTask,
         completeTask,
         breakdownTask,
       } from "../api/tasks";

function TaskCard({
  id,
  title,
  priority,
  deadline,
  status,
  onTaskDeleted,
}) {
     const [breakdown, setBreakdown] = useState("");
     const [loadingBreakdown, setLoadingBreakdown] = useState(false);

     const handleComplete = async () => {
  try {
    await completeTask(id);

    if (onTaskDeleted) {
      onTaskDeleted();
    }
  } catch (err) {
    console.error(err);
    alert("Failed to complete task");
  }
};


  const handleDelete = async () => {
    try {
      await deleteTask(id);

      if (onTaskDeleted) {
        onTaskDeleted();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };
  const handleBreakdown = async () => {
    try {
       setLoadingBreakdown(true);

       const res = await breakdownTask(title);

       setBreakdown(res.data.breakdown);
     } catch (err) {
       console.error(err);
       alert("Failed to generate breakdown");
     } finally {
       setLoadingBreakdown(false);
     }
    };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-4 transition hover:shadow-xl">
      <div className="flex justify-between items-center">
        <h3
          className={`text-xl font-semibold ${
              status === "Completed"
                ? "line-through text-gray-400"
                : ""
            }`}
        >
            {title}
          </h3>

        <span
          className={`px-3 py-1 rounded-full font-semibold ${
            priority === "High"
              ? "bg-red-100 text-red-600"
              : priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
            }`}
        >
            {priority}
          </span>
      </div>

   <p className="text-gray-500 mt-2">
      Deadline: {deadline}
   </p>

{deadline !== "No Deadline" && (() => {
  const due = new Date(deadline);
  const now = new Date();

  const hours = (due.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (status === "Completed") return null;

  if (hours < 0) {
    return (
      <span className="inline-block mt-2 bg-red-100 text-red-600 px-3 py-1 rounded-full">
        🔴 Overdue
      </span>
    );
  }

  if (hours <= 24) {
    return (
      <span className="inline-block mt-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
        ⏰ Due Soon
      </span>
    );
  }

  return null;
})()}

      <p className="mt-3">
        <span
           className={`px-3 py-1 rounded-full text-sm font-semibold ${
             status === "Completed"
               ? "bg-green-100 text-green-700"
               : "bg-yellow-100 text-yellow-700"
            }`}
        >
            {status}
        </span>
       </p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleComplete}
          disabled={status === "Completed"}
          className={`px-4 py-2 rounded-lg text-white ${
            status === "Completed"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
         }`}
        >
           {status === "Completed" ? "Completed" : "Complete"}
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
        
        <button
           onClick={handleBreakdown}
           className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
           {loadingBreakdown ? "Generating..." : "✨ Break Down"}
        </button>
      </div>

      {breakdown && (
        <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4 whitespace-pre-wrap">
           <h4 className="font-bold text-purple-700 mb-2">
             📋 AI Suggested Subtasks
           </h4>

           <p>{breakdown}</p>
         </div>
  )}
  </div>
  );
}
export default TaskCard;
