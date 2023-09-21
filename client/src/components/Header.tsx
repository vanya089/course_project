import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {userSelector} from "../redux/slices/users/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../redux/store";
import {logoutUser} from "../redux/slices/users/asyncActions";
import {searchReviews} from "../redux/slices/reviews/asyncActions";


const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {user} = useSelector(userSelector);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="flex items-center justify-between font-bold bg-teal-800 h-20 px-6 rounded-md">
            <Link to="/">
                <h1 className="text-3xl">Best choice!</h1>
            </Link>
            <div className="flex gap-5">
                <input
                    className="text-black rounded-md p-2"
                    type="text"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        dispatch(searchReviews(e.target.value));
                    }}
                />
            </div>
            <div className="flex gap-2">
                {user.isLogin ? (
                    <>
                        <Link to={"userPage"}>
                            <button className="text-white border rounded-md p-2">{user.user!.username}</button>
                        </Link>
                        <button onClick={() => dispatch(logoutUser())}
                                className="text-white border rounded-md p-2">Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="p-2 border rounded-md">Login</button>
                        </Link>
                        <Link to="/registration">
                            <button className="p-2 border-2 rounded-md">
                                <b>Sign Up</b>
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;