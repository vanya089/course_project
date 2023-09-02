import React from 'react';
import {IReview} from "../../redux/types";


const Review: React.FC<IReview> = ({id, title, description, year,genre, imageUrl}) => {
    return (
        <div className="container flex justify-center w-[280px] text-center m-2 mb-10 border-2 border-teal-800 rounded-md">
            <div className="w-[280px] h-full text-center mb-10">
                <img className="inline mb-5 w-full rounded-t" src={imageUrl} alt="review"/>
                <h3 className="text-xl font-extrabold mb-5">{title}</h3>
                <p className="text-xl">{year}, {genre}</p>
            </div>

        </div>
    );
};

export default Review;