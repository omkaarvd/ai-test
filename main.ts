import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

async function main() {
  /*
  // Example of generating Enums
  const { object } = await generateObject({
    model: google("gemini-2.0-flash-exp"),
    system:
      `Classify the sentiment of the text as either ` +
      `positive, negative, or neutral.`,
    output: "enum",
    enum: ["positive", "negative", "neutral"],
    prompt: "i'm not feeling well today",
  });
  */

  const schema = z.object({
    name: z.string(),
    age: z.number(),
    email: z.string(),
  });

  // Example of generating array of objects
  const { object } = await generateObject({
    model: google("gemini-2.0-flash-exp"),
    system: `You are generating fake user data.`,
    prompt: "Generate 5 fake users from the India.",
    output: "array",
    schema,
  });

  console.log(object);
}

main();
