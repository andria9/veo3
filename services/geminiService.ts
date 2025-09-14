
import { GoogleGenAI } from "@google/genai";
import type { GenerateVideoParams } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    imageBytes: await base64EncodedDataPromise,
    mimeType: file.type,
  };
};

export const generateVideo = async ({ prompt, image }: GenerateVideoParams): Promise<Blob> => {
  console.log("Starting video generation...");

  try {
    const imagePart = image ? await fileToGenerativePart(image) : undefined;

    let operation = await ai.models.generateVideos({
      model: 'VO-3.0-generate-preview',
      prompt: prompt,
      ...(imagePart && { image: imagePart }),
      config: {
        numberOfVideos: 1,
      },
    });

    console.log("Operation started:", operation);

    // Polling logic
    while (!operation.done) {
      console.log("Operation not done, waiting 10 seconds...");
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
      console.log("Polling... Current operation state:", operation);
    }
    
    console.log("Operation finished:", operation);

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
      throw new Error("Video generation succeeded, but no download link was provided.");
    }
    
    console.log("Fetching video from:", downloadLink);
    // The VEO download link requires the API key to be appended for authentication
    const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    
    if (!videoResponse.ok) {
        const errorText = await videoResponse.text();
        throw new Error(`Failed to download the generated video. Status: ${videoResponse.status}. Details: ${errorText}`);
    }

    const videoBlob = await videoResponse.blob();
    console.log("Video blob received, size:", videoBlob.size);
    return videoBlob;

  } catch (error) {
    console.error("Error in generateVideo service:", error);
    if (error instanceof Error) {
        throw new Error(`[Gemini Service Error] ${error.message}`);
    }
    throw new Error("An unexpected error occurred in the Gemini service.");
  }
};
