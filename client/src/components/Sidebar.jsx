function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Menu</h2>

      <ul className="space-y-4">
        <li>🏠 Dashboard</li>
        <li>📋 Tasks</li>
        <li>🤖 AI Planner</li>
        <li>📅 Calendar</li>
        <li>📊 Analytics</li>
      </ul>
    </aside>
  );
}

export default Sidebar;