import React from 'react';
import {ReviewType} from "../../redux/slices/reviews/types";
import {useSelector} from "react-redux";
import {themeSelector} from "../../redux/slices/theme/themeSlice";


const Review: React.FC<ReviewType> = ({_id, title, description, year, genre, imageUrl}) => {
    const isDarkMode = useSelector(themeSelector);

    return (
        <div className={`"container flex justify-center w-[280px] text-center m-2 mb-10 border-2
         ${isDarkMode ? 'border-teal-800' : 'border-blue-600'} rounded-md`}>
            <div className="w-[280px] h-[476px] text-center mb-10 ">
                <img className="inline mb-5 w-full h-96 rounded-t" width={276} height={414} src={imageUrl} alt="review"/>
                <h3 className={`text-xl font-extrabold mb-5 ${isDarkMode ? 'text-white' : 'text-black'}`}>{title}</h3>
                <p className={`text-l  ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>{year}, {genre}</p>
            </div>

        </div>
    );
};

export default Review;