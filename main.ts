import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";

async function main() {
  const schema = z.object({
    name: z.string(),
    age: z.number(),
    email: z.string(),
  });

  const { partialObjectStream } = streamObject({
    model: google("gemini-2.0-flash-exp"),
    system: `You are generating fake user data.`,
    prompt: "Generate 5 fake users from the India.",
    output: "array",
    schema,
  });

  for await (const chunk of partialObjectStream) {
    console.clear();
    console.log(chunk);
  }
}

main();
