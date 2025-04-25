import { google } from "@ai-sdk/google";
import { CoreMessage, generateText } from "ai";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messagesToSend: CoreMessage[] = [
  {
    role: "system",
    content:
      "You are a helpful assistant that can generate text based on the given prompt and make sure to stick to the shorter answers.",
  },
];

console.log("Chat started!");

rl.setPrompt("You: ");
rl.prompt();

rl.on("line", async (input) => {
  if (input.trim().toLowerCase() === "exit") {
    console.log("Exiting chat...");
    rl.close();
    return;
  }

  if (input.trim().length === 0) {
    console.log("Please enter a valid input.");
    rl.prompt();
    return;
  }

  messagesToSend.push({ role: "user", content: input });

  try {
    const { text } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      messages: messagesToSend,
    });

    console.log("Assistant: ", text);
    messagesToSend.push({ role: "assistant", content: text });

    // console.log("Messages sent so far: ", messagesToSend);
  } catch (error) {
    console.log(error);

    rl.prompt();
    return;
  }

  rl.prompt();
});
