import { google } from "@ai-sdk/google";
import { streamText } from "ai";

async function main() {
  const { textStream } = streamText({
    model: google("gemini-1.5-pro-latest"),
    prompt:
      "Invent a new holiday in Indian calender and describe its traditions.",
  });

  for await (const textPart of textStream) {
    process.stdout.write(textPart);
  }
}

main();
