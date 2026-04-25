const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API });

// Chatbot route
router.post("/chat", async (req, res) => {
  const { message, history } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are Tasya AI, a helpful assistant for a creative blog platform called Tasya. Be concise, friendly, and encouraging."
        },
        ...history,
        { role: "user", content: message }
      ],
      model: "llama-3.1-8b-instant",
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Groq Chat Error:", error);
    res.status(500).json({ error: "AI Chat failed" });
  }
});

// Writing assistant route
router.post("/improve", async (req, res) => {
  const { content, title } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional blog editor. Improve the following blog post to be more engaging, clear, and professional. Maintain the original intent but enhance the vocabulary and flow. RETURN ONLY THE IMPROVED CONTENT IN HTML FORMAT. DO NOT use markdown symbols like '**' for bold. Use <b> or <strong> tags for bold, and <i> or <em> for italics if needed. The output should be ready to be rendered in a rich text editor."
        },
        {
          role: "user",
          content: `Title: ${title}\n\nContent: ${content}`
        }
      ],
      model: "llama-3.1-8b-instant",
    });

    res.json({ improvedContent: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Groq Improve Error:", error);
    res.status(500).json({ error: "AI improvement failed" });
  }
});

module.exports = router;
