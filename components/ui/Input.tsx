
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...props }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                {...props}
            />
        </div>
    );
};

export default Input;
