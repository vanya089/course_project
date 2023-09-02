import React from 'react';
import {IReview} from "../redux/types";


const Review: React.FC<IReview> = ({id, title, description, year,genre, imageUrl}) => {
    return (
        <div className="container flex justify-center w-[280px] text-center mb-10">
            <div className="w-[280px] text-center mb-10">
                <img className="inline mb-5 w-[130px]" src={imageUrl} alt="review"/>
                <h3 className="text-xl font-extrabold mb-5">{title}</h3>
                <p>{year}, {genre}</p>
            </div>

        </div>
    );
};

export default Review;