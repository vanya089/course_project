import React from 'react';
import {BsArrowDownRightSquare} from "react-icons/bs";

const Footer = () => {
    return (
        <div className="flex text-sm font-bold bg-teal-800 h-20 rounded-md">
            <div className="text-neutral-200">
                <p className="flex mx-6 mt-12">All right reserved<BsArrowDownRightSquare size={10}/></p>
            </div>
        </div>
    );
};

export default Footer;