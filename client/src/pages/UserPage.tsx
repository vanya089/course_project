import React from 'react';
import {Link} from "react-router-dom";


const UserPage: React.FC = () => {


    return (
        <div className="mx-auto my-40 h-[390px] w-[400px]">
            <div className="flex flex-col">
                <Link to={"/createReview"}><button className="border">Сделать обзор</button></Link>
            </div>
        </div>
    );
};

export default UserPage;