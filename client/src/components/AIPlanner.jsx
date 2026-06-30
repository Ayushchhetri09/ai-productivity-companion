import { useState } from "react";
import axios from "axios";

function AIPlanner() {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    setLoading(true);

    try {
      const res = await axios.get("https://ai-productivity-companion-1.onrender.com/plan");
      setPlan(res.data.plan);
    } catch (err) {
      alert("Failed to generate AI plan.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        🤖 AI Productivity Planner
      </h2>

      <button
        onClick={generatePlan}
        disabled={loading}
        className={`px-5 py-2 rounded-lg text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
    >
        {loading ? "Generating AI Plan..." : "✨ Generate AI Plan"}
    </button>

      {plan && (
        <div className="mt-6 p-6 rounded-xl border bg-gray-50 whitespace-pre-wrap">
           <h3 className="text-xl font-bold mb-4">
              🤖 AI Productivity Report
           </h3>

           <div>{plan}</div>
         </div>
      )}
    </div>
  );
}

export default AIPlanner;