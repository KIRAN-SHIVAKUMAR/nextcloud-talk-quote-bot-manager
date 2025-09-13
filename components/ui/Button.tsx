
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'secondary', ...props }) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500',
        secondary: 'bg-slate-700 text-slate-200 hover:bg-slate-600 focus:ring-slate-500',
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
