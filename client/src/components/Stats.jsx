function Stats({ tasks }) {
  const pending = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const overdue = tasks.filter((task) => {
    if (!task.deadline || task.status === "Completed") return false;

    return new Date(task.deadline) < new Date();
  }).length;

  const score =
    tasks.length === 0
      ? 100
      : Math.round((completed / tasks.length) * 100);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-blue-100 p-4 rounded-xl text-center">
        <h3 className="text-lg font-bold">📋 Pending</h3>
        <p className="text-3xl">{pending}</p>
      </div>

      <div className="bg-green-100 p-4 rounded-xl text-center">
        <h3 className="text-lg font-bold">✅ Completed</h3>
        <p className="text-3xl">{completed}</p>
      </div>

      <div className="bg-red-100 p-4 rounded-xl text-center">
        <h3 className="text-lg font-bold">⏰ Overdue</h3>
        <p className="text-3xl">{overdue}</p>
      </div>

      <div className="bg-purple-100 p-4 rounded-xl text-center">
        <h3 className="text-lg font-bold">🤖 AI Score</h3>
        <p className="text-3xl">{score}%</p>
      </div>
    </div>
  );
}

export default Stats;