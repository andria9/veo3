
import React from 'react';

interface ImagePreviewProps {
  imagePreview: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imagePreview, onImageChange, onRemoveImage }) => {
  return (
    <div className="w-full">
      {imagePreview ? (
        <div className="relative group aspect-video">
          <img src={imagePreview} alt="Image preview" className="w-full h-full object-contain rounded-lg border border-slate-600" />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
            <button
              onClick={onRemoveImage}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon />
            <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={onImageChange} />
        </label>
      )}
    </div>
  );
};
