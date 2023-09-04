import React from 'react';
import movies from "../movies.json";
import Review from "../components/review/Review";
import ReviewSkeleton from "../components/review/ReviewSkeleton";

const Home = () => {
   const status = 'loading';
    const reviews = movies.map((items) => <Review key={items._id} {...items}/>);
    const skeletons = [...new Array(12)].map((_, index) => <ReviewSkeleton key={index}/>);

    return (
        <div className="mx-auto w-[90%]">
            {
                <div className="grid grid-cols-4 grid-rows-3 gap-8">
                    {status === 'loading' ? reviews : skeletons}
                </div>
            }
        </div>
    );
};

export default Home;