import { google } from "@ai-sdk/google";
import { generateText } from "ai";

async function main() {
  const { text } = await generateText({
    model: google("gemini-1.5-pro-latest"),
    prompt:
      "Invent a new holiday in Indian calender and describe its traditions.",
  });

  console.log(text);
}

main();
