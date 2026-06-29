import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import supabase from "./config/supabase.js";
import { generatePlan, breakdownTask } from "./ai/gemini.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Productivity Companion API is running 🚀",
  });
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*");

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
app.post("/tasks", async (req, res) => {
  const { title, description, priority, deadline } = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        title,
        description,
        priority,
        deadline,
      },
    ])
    .select();

  if (error) {
    return res.status(500).json(error);
  }

  res.status(201).json(data);
});
app.get("/plan", async (req, res) => {
  try {
    const { data: tasks, error } = await supabase
      .from("tasks")
      .select("*");

    if (error) {
      return res.status(500).json(error);
    }

    const plan = await generatePlan(tasks);

    res.json({
      success: true,
      plan,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to generate AI plan",
    });
  }
});
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json(error);
  }

  res.json({
    success: true,
    message: "Task deleted successfully",
  });
});
app.put("/tasks/:id/complete", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("tasks")
    .update({ status: "Completed" })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});
app.post("/breakdown", async (req, res) => {
  try {
    const { title } = req.body;

    const breakdown = await breakdownTask(title);

    res.json({
      success: true,
      breakdown,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to generate breakdown",
    });
  }
});
