import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

async function transcribeAudio(audioUrl) {
  console.log("GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY);
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

  try {
    // 1. Download audio from URL
    const response = await fetch(audioUrl);
    if (!response.ok)
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    const buffer = await response.arrayBuffer();

    // 2. Store it in a temp file
    const tempFilePath = path.resolve(`temp_recording_${Date.now()}.webm`);
    fs.writeFileSync(tempFilePath, Buffer.from(buffer));

    console.log("Saved temp file:", tempFilePath);

    // 3. Upload to Google GenAI
    const myfile = await ai.files.upload({
      file: tempFilePath, // pass local file path
      config: { mimeType: "audio/webm" }, // correct MIME type
    });

    console.log("Uploaded file:", myfile);

  
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromUri(myfile.uri, myfile.mimeType),
        "Generate a transcript of the speech.",
      ]),
    });
    console.log("result.text=", result.text);
    // 5. Clean up temp file
    fs.unlinkSync(tempFilePath);
    console.log("Deleted temp file");
    return result.text;
  } catch (error) {
    console.error("Error processing audio:", error);
  }
}

// Example usage
export default transcribeAudio;
