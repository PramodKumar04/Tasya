require("dotenv").config({ path: "./.env" });
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API });

async function main() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Hello" }],
      model: "llama-3.1-8b-instant",
    });
    console.log("Success:", chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
