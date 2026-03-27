import React from 'react';

const IconButton = ({handleClick, icon, label}) => {
    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-2 bg-[#1a56db] text-white p-2 md:px-5 md:py-2.5 rounded-xl font-medium hover:bg-[#1e40af] transition-colors">
            {icon} <span className='hidden md:block'> {label}</span>
        </button>
    );
};

export default IconButton;