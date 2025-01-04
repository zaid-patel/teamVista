import React from 'react';

export default function Button({
    children,
    type = "button",
    bgColor = "bg-gold-600", // Default to a golden background
    textColor = "text-black", // Default to black text
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-6 py-3 rounded-lg transition duration-300 ease-in-out 
                ${bgColor} ${textColor} ${className} 
                hover:bg-gold-700 hover:text-white 
                focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-opacity-50`}
            {...props}
        >
            {children}
        </button>
    );
}