import React, {useEffect} from 'react';
import Review from "../components/review/Review";
import ReviewSkeleton from "../components/review/ReviewSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../redux/store";
import {fetchReviews} from "../redux/slices/reviews/asyncActions";
import {reviewSelector, setSearchResults} from "../redux/slices/reviews/reviewSlice";
import {ReviewType} from "../redux/slices/reviews/types";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {reviews, status} = useSelector(reviewSelector);
    const {searchResults} = useSelector(reviewSelector);

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


    const items = searchResults.length > 0
        ? searchResults.map((review: ReviewType) => <Review key={review._id} {...review}/>)
        : reviews.map((obj) => <Review key={obj._id} {...obj}/>);
    const skeletons = [...new Array(12)].map((_, index) => <ReviewSkeleton key={index}/>);

    return (
        <div className="mx-auto min-h-[700px] w-[90%]">
            <div className="my-12 p-6 w-full h-40 border rounded-md  border-teal-800">

                <h3 className="text-xl text-center">
                    Добро пожаловать на сайт обзоров фильмов, книг, сериалов.
                    Чтобы добавить свой обзор, зарегистрируйтесь или войдите.
                </h3>
            </div>
            {
                <div className="grid grid-cols-4 grid-rows-3 gap-8">
                    {status === 'loading' ? skeletons : items}
                </div>
            }
        </div>
    );
};

export default Home;