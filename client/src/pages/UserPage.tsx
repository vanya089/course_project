import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import movies from "../movies.json";
import Review from "../components/review/Review";
import ReviewSkeleton from "../components/review/ReviewSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {reviewSelector} from "../redux/slices/reviews/reviewSlice";
import {fetchReviews} from "../redux/slices/reviews/asyncActions";
import {AppDispatch} from "../redux/store";


const UserPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {reviews, status} = useSelector(reviewSelector);

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

    const items = reviews.map((items) => <Review key={items._id} {...items}/>);
    const skeletons = [...new Array(12)].map((_, index) => <ReviewSkeleton key={index}/>);

    return (
        <div className="flex flex-col items-center mx-auto my-40 w-[90%]">
            <div className=" p-11 w-full h-40 border rounded-md  border-teal-800 ">
                <div className="text-xl text-center ">
                    <p>Здесь вы сможете посмотреть свои обзоры и добавить новый.</p>
                    <p>Чтобы написать новый обзор, нажмите "Сделать обзор"</p>
                </div>
            </div>
            <div className="my-12">
                <Link to={"/createReview"}>
                    <button className="border rounded border-teal-800 p-2 bg-teal-900">Сделать обзор</button>
                </Link>
            </div>
            <div className="grid grid-cols-4 grid-rows-3 gap-8">

                {status === 'loading' ? skeletons : items}
            </div>
        </div>
    );
};

export default UserPage;