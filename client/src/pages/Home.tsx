import React from 'react';
import movies from "../movies.json";
import Review from "../components/Review";

const Home = () => {
    const status = "full"
    const reviews = movies.map((items) => <Review key={items.id} {...items}/>)
    return (
        <div className="mx-auto w-[90%]">
            {
                <div className="grid grid-cols-4 grid-rows-3 gap-8 bg-gray-400">{reviews}</div>
            }
        </div>
    );
};

export default Home;