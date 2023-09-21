import React from 'react';
import {Link} from "react-router-dom";
import movies from "../movies.json";
import Review from "../components/review/Review";
import ReviewSkeleton from "../components/review/ReviewSkeleton";


const UserPage: React.FC = () => {
    const status = 'loading';
    const reviews = movies.map((items) => <Review key={items._id} {...items}/>);
    const skeletons = [...new Array(12)].map((_, index) => <ReviewSkeleton key={index}/>);

    return (
        <div className="flex flex-col items-center mx-auto my-40     ">
            <div className=" p-6 w-[500px] h-40 bg-red-500">
                <p>Добро пожаловать в страницу пользователя! </p>
                <p>Здесь вы сможете посмотреть свои обзоры и добавить новый.</p>
                <p>Чтобы написать новый обзор, нажмите "Сделать обзор"</p>
            </div>
            <div className="my-12">
                <Link to={"/createReview"}>
                    <button className="border">Сделать обзор</button>
                </Link>
            </div>
            <div className="grid grid-cols-4 grid-rows-3 gap-8">

                {status === 'loading' ? reviews : skeletons}
            </div>
        </div>
    );
};

export default UserPage;