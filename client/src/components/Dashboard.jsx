import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";
import AIPlanner from "./AIPlanner";
import { getTasks } from "../api/tasks";
import Stats from "./Stats";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("deadline");

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-4xl font-bold">
        Good Afternoon, Ayush 👋
      </h2>

      <p className="text-gray-500 mt-2 mb-8">
        Let's complete today's goals.
      </p>

      <Stats tasks={tasks} />
       
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <AddTask onTaskAdded={loadTasks} />

       <AIPlanner />
      </div> 
       <div className="mb-6">
         <input
           type="text"
           placeholder="🔍 Search tasks..."
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           className="w-full border rounded-lg p-3"
        />
      </div>
       <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="border rounded-lg p-3 mb-6"
>
  <option value="deadline">Deadline</option>
  <option value="priority">Priority</option>
  <option value="status">Status</option>
</select>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        📋 Your Tasks
      </h3>

      
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks
          .sort((a, b) => {
  if (sortBy === "priority") {
    const order = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    return order[a.priority] - order[b.priority];
  }

  if (sortBy === "status") {
    return a.status.localeCompare(b.status);
  }

  if (sortBy === "deadline") {
    return new Date(a.deadline || 9999999999999) -
           new Date(b.deadline || 9999999999999);
  }

  return 0;
})
          .filter((task) =>
             task.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((task) => (
         <TaskCard
           key={task.id}
           id={task.id}
           title={task.title}
           priority={task.priority}
           deadline={
               task.deadline
                   ? new Date(task.deadline).toLocaleString()
                   : "No Deadline"
            }
            status={task.status}
            onTaskDeleted={loadTasks}
         /> 
        ))
      )}

    </div>
  );
}

export default Dashboard;