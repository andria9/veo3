
import React from 'react';
import { Spinner } from './Spinner';

interface GenerationControlsProps {
    isLoading: boolean;
    onSubmit: () => void;
}

export const GenerationControls: React.FC<GenerationControlsProps> = ({ isLoading, onSubmit }) => {
    return (
        <div className="mt-4">
            <button
                onClick={onSubmit}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
                {isLoading ? (
                    <>
                        <Spinner />
                        Generating...
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 001.553.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                        Generate Video
                    </>
                )}
            </button>
        </div>
    );
};
