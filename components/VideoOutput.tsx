
import React from 'react';

interface VideoOutputProps {
  videoUrl: string | null;
}

const Placeholder: React.FC = () => (
    <div className="w-full aspect-video bg-slate-900/70 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <p className="mt-4 text-slate-500">Your generated video will appear here</p>
    </div>
);

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


export const VideoOutput: React.FC<VideoOutputProps> = ({ videoUrl }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      {videoUrl ? (
        <div className="w-full space-y-4">
          <video src={videoUrl} controls autoPlay loop className="w-full aspect-video rounded-lg bg-black" />
          <a
            href={videoUrl}
            download="veo-generated-video.mp4"
            className="w-full flex items-center justify-center px-6 py-3 text-md font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            <DownloadIcon />
            Download Video
          </a>
        </div>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};
