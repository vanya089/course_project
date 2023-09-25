import React, {useEffect} from 'react';
import Review from "../components/review/Review";
import ReviewSkeleton from "../components/review/ReviewSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../redux/store";
import {fetchReviews} from "../redux/slices/reviews/asyncActions";
import {reviewSelector} from "../redux/slices/reviews/reviewSlice";
import {ReviewType} from "../redux/slices/reviews/types";
import {themeSelector} from "../redux/slices/theme/themeSlice";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isDarkMode = useSelector(themeSelector);
    const {reviews, status} = useSelector(reviewSelector);
    const {searchResults} = useSelector(reviewSelector);

    const getReviews = async () => {
        try {
            dispatch(fetchReviews())
        } catch (e) {
            console.error(e, "Axios error!")
        }

        window.scrollTo(0, 0)
    }

    useEffect(() => {
        getReviews()
    }, [])


    const items = searchResults.length > 0
        ? searchResults.map((review: ReviewType) => <Review key={review._id} {...review}/>)
        : reviews.map((obj) => <Review key={obj._id} {...obj}/>);
    const skeletons = [...new Array(12)].map((_, index) => <ReviewSkeleton key={index}/>);

    return (
        <div className="mx-auto min-h-[700px] w-[90%]">
            <div className={`my-12 p-6 w-full h-40 border rounded-md   
            ${isDarkMode ? 'border-teal-800' : 'border-blue-600'}`}>

                <h3 className={`p-6 text-xl text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Welcome to the site for reviews of films, books, and TV series.
                    <p>To add your review, register or log in.</p>
                </h3>
            </div>
            {
                <div
                    className="ml-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-3 gap-8 inline-grid justify-items-center items-center">
                    {status === 'loading' ? skeletons : items}
                </div>
            }
        </div>
    );
};

export default Home;