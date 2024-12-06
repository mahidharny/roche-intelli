"use server";

// import { generateText } from "ai";
// import { openai } from "@ai-sdk/openai";
import fs from "fs";
import path from "path";
import os from "os";

export async function transcribeAudio(formData: FormData) {
  const file = formData.get("audio") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  // Save the file temporarily
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, file.name);
  const bytes = await file.arrayBuffer();
  fs.writeFileSync(tempFilePath, Buffer.from(bytes));

  try {
    // const { text } = await generateText({
    //   model: openai("whisper-1"),
    //   prompt:
    //     "Transcribe the following audio file with timestamps every 5 seconds:",
    //   file: {
    //     data: fs.readFileSync(tempFilePath),
    //     mimeType: file.type,
    //   },
    // });
    const text = "hi";

    // Parse the transcription to separate timestamps and text
    const lines = text.split("\n");
    const transcription = lines.map((line) => {
      const match = line.match(/\[(\d{2}:\d{2})\] (.+)/);
      if (match) {
        return { timestamp: match[1], text: match[2] };
      }
      return { timestamp: "", text: line };
    });

    return transcription;
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error("Failed to transcribe audio");
  } finally {
    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);
  }
}
