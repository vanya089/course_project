import React from 'react';
import {BsArrowDownRightSquare} from "react-icons/bs";
import {useSelector} from "react-redux";
import {themeSelector} from "../redux/slices/theme/themeSlice";


const Footer: React.FC = () => {
    const isDarkMode = useSelector(themeSelector);

    return (
        <div className={`flex text-sm font-bold ${isDarkMode ? 'bg-teal-800' : ' bg-blue-600'} h-20 rounded-md`}>
            <div className="text-neutral-200">
                <p className="flex mx-6 mt-12">All right reserved<BsArrowDownRightSquare size={10}/></p>
            </div>
        </div>
    );
};

export default Footer;