import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const ReviewInfo = () => {
    const [review, setReview] = useState<{
        imageUrl: string;
        title: string;
        description: string;
    }>();
    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchReview() {
            try {
                const {data} = await axios.get('https://' + id);
                setReview(data);
            } catch (e) {
                navigate("/")
            }
        }

        fetchReview();
    }, [id])

    if(!review) return <>"Download...."</>;

    return (
        <div className="container">
            <img src={review.imageUrl} alt=""/>
            <h2>{review.title}</h2>
            <p>{review.description} ₽</p>
        </div>
    );
};

export default ReviewInfo;