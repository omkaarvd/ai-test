import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { readFileSync } from "node:fs";

async function main() {
  const { text: description } = await generateText({
    model: google("gemini-2.0-flash-exp"),
    system:
      `You will receive an image. ` +
      `Please create an alt text for the image. ` +
      `Be concise. ` +
      `Use adjectives only when necessary. ` +
      `Do not pass 160 characters. ` +
      `Use simple language. `,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image", // file | image | text
            image: readFileSync("images/bluelock.png"),
            mimeType: "image/png",
          },
        ],
      },
    ],
  });

  console.log(description);
}

main();
