import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI("");

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent([
    "Which anime is shown in this image and can you tell what is this image is about?",
    {
      inlineData: {
        data: Buffer.from(fs.readFileSync("images/bluelock.png")).toString(
          "base64"
        ),
        mimeType: "image/png",
      },
    },
  ]);
  console.log(result.response.text());
}
run();
