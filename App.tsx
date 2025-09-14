import React, { useState, useCallback, useEffect, useRef } from 'react';
import { generateVideo } from './services/geminiService';
import { ImagePreview } from './components/ImagePreview';
import { OptionSelector } from './components/OptionSelector';
import { LoadingOverlay } from './components/LoadingOverlay';
import { VideoOutput } from './components/VideoOutput';
import { GenerationControls } from './components/GenerationControls';
import { Header } from './components/Header';
import { ErrorDisplay } from './components/ErrorDisplay';
import type { AspectRatio, Resolution } from './types';
import { LOADING_MESSAGES } from './constants';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A majestic cinematic shot of a futuristic city with flying cars, golden hour');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [enableSound, setEnableSound] = useState<boolean>(true);
  const [resolution, setResolution] = useState<Resolution>('1080p');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  
  const videoUrlRef = useRef<string | null>(null);

  // Fix: Refactor useEffect to correctly handle interval creation and cleanup.
  // This resolves a TypeScript error with NodeJS.Timeout and prevents potential runtime errors.
  useEffect(() => {
    if (isLoading) {
      setLoadingMessage(LOADING_MESSAGES[0]);
      let messageIndex = 0;
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
        setLoadingMessage(LOADING_MESSAGES[messageIndex]);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);
  
  // Clean up Object URL when component unmounts or video changes
  useEffect(() => {
    return () => {
      if (videoUrlRef.current) {
        URL.revokeObjectURL(videoUrlRef.current);
      }
    };
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = useCallback(async () => {
    if (!prompt) {
      setError('Prompt cannot be empty.');
      return;
    }

    if (videoUrlRef.current) {
      URL.revokeObjectURL(videoUrlRef.current);
      videoUrlRef.current = null;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedVideoUrl(null);

    try {
      const videoBlob = await generateVideo({
        prompt,
        image: imageFile,
        // The following options are for UI demonstration.
        // The current VEO API does not support them directly in the provided SDK docs.
        aspectRatio,
        enableSound,
        resolution,
      });

      const url = URL.createObjectURL(videoBlob);
      videoUrlRef.current = url;
      setGeneratedVideoUrl(url);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unknown error occurred during video generation.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, imageFile, aspectRatio, enableSound, resolution]);


  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {isLoading && <LoadingOverlay message={loadingMessage} />}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Controls */}
          <div className="flex flex-col gap-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-2xl">
            <div>
              <label htmlFor="prompt" className="block text-lg font-semibold mb-2 text-cyan-300">
                1. Enter Your Prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A simple string or a JSON object describing your scene..."
                className="w-full h-36 p-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 resize-none"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2 text-cyan-300">
                2. Add a Reference Image (Optional)
              </label>
              <ImagePreview 
                imagePreview={imagePreview} 
                onImageChange={handleImageChange} 
                onRemoveImage={removeImage} 
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-cyan-300">3. Configure Options</h3>
              <div className="space-y-4">
                <OptionSelector
                  label="Aspect Ratio"
                  selectedValue={aspectRatio}
                  onChange={(val) => setAspectRatio(val as AspectRatio)}
                  options={['16:9', '9:16']}
                />
                <OptionSelector
                  label="Resolution"
                  selectedValue={resolution}
                  onChange={(val) => setResolution(val as Resolution)}
                  options={['720p', '1080p']}
                />
                <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                  <span className="font-medium text-gray-300">Enable Sound</span>
                  <label htmlFor="sound-toggle" className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="sound-toggle" className="sr-only peer" checked={enableSound} onChange={() => setEnableSound(!enableSound)} />
                    <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <GenerationControls
              isLoading={isLoading}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Right Column: Output */}
          <div className="flex flex-col gap-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-2xl h-full">
             <h2 className="text-2xl font-bold text-center text-cyan-300">Output</h2>
             {error && <ErrorDisplay message={error} />}
             <VideoOutput videoUrl={generatedVideoUrl} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;