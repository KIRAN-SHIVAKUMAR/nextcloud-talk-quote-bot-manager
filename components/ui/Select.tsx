
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, name, children, className = '', ...props }) => {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1">
                {label}
            </label>
            <select
                id={name}
                name={name}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                {...props}
            >
                {children}
            </select>
        </div>
    );
};

export default Select;
