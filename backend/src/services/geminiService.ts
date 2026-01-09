import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../credentials/credentials.ts";
import { systemPrompt } from "../utils/systemPrompt.ts";

export async function generateGeminiResponse(
  userInput: string,
): Promise<{ summary: string; key_points: string[]; action_items: string[] }> {
  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });

  const tools = [
    {
      googleSearch: {},
    },
  ];

  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
    systemInstruction: systemPrompt
  };

  const model = "gemini-flash-latest";

  const contents = [
    {
      role: "user",
      parts: [{ text: userInput }],
    },
  ];

  let finalText = "";

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  for await (const chunk of response) {
    finalText += chunk.text;
  }

  try {
    return JSON.parse(finalText);
  } catch (err) {
    console.error("Failed to parse AI response as JSON:", finalText, err);
    return {
      summary: finalText,
      key_points: [],
      action_items: [],
    };
  }
}
