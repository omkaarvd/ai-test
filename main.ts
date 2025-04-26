import { google } from "@ai-sdk/google";
import { cosineSimilarity, embed, embedMany } from "ai";

const model = google.textEmbeddingModel("text-embedding-004");

async function main() {
  const values = ["Dog", "Cat", "Car", "Bike"];

  // `embeddings` -> they are in the same order as the values.
  const { embeddings } = await embedMany({
    model,
    values,
  });

  // console.dir(embeddings, { depth: null });

  const vectorList = embeddings.map((embedding, index) => ({
    value: values[index],
    embedding,
  }));

  const searchTerm = await embed({
    model,
    value: "barking dog",
  });

  const entries = vectorList.map((entry) => {
    return {
      value: entry.value,
      similarity: cosineSimilarity(entry.embedding, searchTerm.embedding),
    };
  });

  const sortedEntries = entries.sort((a, b) => b.similarity - a.similarity);

  console.dir(sortedEntries, { depth: null });
}

main();
