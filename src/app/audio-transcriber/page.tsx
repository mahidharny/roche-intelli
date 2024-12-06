"use client";

import { useState } from "react";
import { transcribeAudio } from "./actions/transcribe";

export default function AudioTranscriptionApp() {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<
    Array<{ timestamp: string; text: string }>
  >([]);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleTranscribe = async () => {
    if (!file) return;

    setIsTranscribing(true);
    try {
      const formData = new FormData();
      formData.append("audio", file);
      const result = await transcribeAudio(formData);
      setTranscription(result);
    } catch (error) {
      console.error("Transcription error:", error);
      alert("Failed to transcribe audio. Please try again.");
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleTextChange = (index: number, newText: string) => {
    setTranscription((prev) =>
      prev.map((item, i) => (i === index ? { ...item, text: newText } : item))
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audio Transcription App</h1>
      <div className="mb-4">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="mb-2"
        />
        <button
          onClick={handleTranscribe}
          disabled={!file || isTranscribing}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {isTranscribing ? "Transcribing..." : "Transcribe"}
        </button>
      </div>
      {transcription.length > 0 && (
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Transcription:</h2>
          {transcription.map((item, index) => (
            <div key={index} className="mb-2">
              <span className="font-mono text-sm">[{item.timestamp}]</span>
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                className="ml-2 p-1 border rounded w-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
