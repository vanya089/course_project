import React from 'react';

const Header = () => {
    return (
        <div className="flex items-center justify-around font-bold bg-blue-500 h-20 rounded-md">
            <h1 className="text-3xl">
                Best choice!
            </h1>
            <button className="border-2 rounded-md">Close</button>
        </div>

    );
};

export default Header;