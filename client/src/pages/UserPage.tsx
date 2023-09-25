import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import Review from "../components/review/Review";
import ReviewSkeleton from "../components/review/ReviewSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {reviewSelector} from "../redux/slices/reviews/reviewSlice";
import {fetchReviews} from "../redux/slices/reviews/asyncActions";
import {AppDispatch} from "../redux/store";
import {themeSelector} from "../redux/slices/theme/themeSlice";


const UserPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {reviews, status} = useSelector(reviewSelector);
    const isDarkMode = useSelector(themeSelector);

    const getReviews = async () => {
        try {
            dispatch(fetchReviews())
        } catch (e) {
            console.log(e, "Axios error!")
        }

        window.scrollTo(0, 0)
    }

    useEffect(() => {
        getReviews()
    }, [])

    const items = Array.isArray(reviews) ? reviews.map((obj) => <Review key={obj._id} {...obj}/>) : [];
    const skeletons = [...new Array(12)].map((_, index) => <ReviewSkeleton key={index}/>);

    return (
        <div className="flex flex-col items-center mx-auto my-40 w-[90%]">
            <div className={` p-11 w-full h-40 border rounded-md  ${isDarkMode ? 'border-teal-800' : 'border-blue-600'}`}>
                <div className={`text-xl text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    <p>Here you can view your reviews and add a new one.</p>
                    <p>To write a new review, click "Create review"</p>
                </div>
            </div>
            <div className="my-12">
                <Link to={"/createReview"}>
                    <button className={`p-2 border rounded 
                    ${isDarkMode ? 'border-teal-800 text-white' : 'border-blue-600 text-black'}`}>Create review</button>
                </Link>
            </div>
            <div className="grid grid-cols-4 grid-rows-3 gap-8">

                {status === 'loading' ? skeletons : items}
            </div>
        </div>
    );
};

export default UserPage;