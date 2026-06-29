function Navbar() {
  return (
    <header className="bg-slate-900 text-white flex justify-between items-center px-8 py-4 shadow-lg">
      <h1 className="text-2xl font-bold">
        AI Productivity Companion
      </h1>

      <div className="flex items-center gap-4">
        <span>👋 Ayush</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="rounded-full"
        />
      </div>
    </header>
  );
}

export default Navbar;