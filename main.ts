import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const model = createGoogleGenerativeAI({
  apiKey: "",
});

const { text } = await generateText({
  model: model("models/gemini-1.5-flash-latest", {
    safetySettings: [
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_LOW_AND_ABOVE",
      },
    ],
  }),
  prompt: "Explain what is TCL in DBMS",
});

console.log(text);
