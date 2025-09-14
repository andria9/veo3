
import React from 'react';
import { Spinner } from './Spinner';

interface LoadingOverlayProps {
  message: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <Spinner size="lg" />
      <p className="mt-6 text-xl text-center text-gray-200 animate-pulse px-4">{message}</p>
      <p className="mt-2 text-sm text-gray-400">Video generation can take a few minutes.</p>
    </div>
  );
};
