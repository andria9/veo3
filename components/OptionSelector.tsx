
import React from 'react';

interface OptionSelectorProps {
  label: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export const OptionSelector: React.FC<OptionSelectorProps> = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-slate-900 rounded-lg">
      <span className="font-medium text-gray-300 px-1">{label}</span>
      <div className="flex bg-slate-800 p-1 rounded-md">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-4 py-1 text-sm font-semibold rounded transition-colors duration-200 ${
              selectedValue === option
                ? 'bg-cyan-600 text-white shadow'
                : 'text-gray-400 hover:bg-slate-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
