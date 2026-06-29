import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generatePlan(tasks) {
 const prompt = `
You are an AI productivity coach.

The user's tasks are:

${JSON.stringify(tasks, null, 2)}

Generate a response with the following sections:

## Highest Priority Task

## Suggested Schedule for Today

## Productivity Tips

## Risks

## Motivation

Keep it concise, practical and easy to read.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
export async function breakdownTask(title) {
  const prompt = `
You are an expert productivity coach.

Break the following task into 5 to 8 small actionable subtasks.

Task:
${title}

Return only a numbered list.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}