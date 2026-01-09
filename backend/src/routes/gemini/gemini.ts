import express from "express";
import { generateGeminiResponse } from "../../services/geminiService.ts";

const router = express.Router();

router.post("/chat", async (req, res) => {
    try {
        const { input } = req.body;

        if (!input) {
            return res.status(400).json({ error: "Input text is required", status: "error" });
        }

        const result = await generateGeminiResponse(input);

        res.json({ result, status: "success" });
    } catch (error) {
        console.error("Error generating Gemini response:", error);
        res.status(500).json({ error: "Something went wrong", status: "error" });
    }
});

export default router;
