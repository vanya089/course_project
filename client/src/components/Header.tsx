import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {userSelector} from "../redux/slices/users/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../redux/store";
import {logoutUser} from "../redux/slices/users/asyncActions";
import {searchReviews} from "../redux/slices/reviews/asyncActions";
import {themeSelector, toggleTheme} from "../redux/slices/theme/themeSlice";
import {FiMoon, FiSun} from "react-icons/fi";



const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {isLogin, user} = useSelector(userSelector);
    const isDarkMode = useSelector(themeSelector);
    const [searchTerm, setSearchTerm] = useState('');

    console.log(isDarkMode)
    return (
        <div
            className={`flex items-center justify-between font-bold ${isDarkMode ? 'bg-teal-800' : ' bg-blue-600'} h-20 px-6 rounded-md`}>
            <Link to="/">
                <h1 className="text-3xl">Best choice!</h1>
            </Link>
            <button
                className={`p-2 rounded-full border ${isDarkMode ? 'bg-gray-800 text-white' : ' bg-white text-gray-800'}`}
                onClick={() => dispatch(toggleTheme())}
            >
                {isDarkMode ? <FiMoon className="w-6 h-6"/> : <FiSun className="w-6 h-6"/>}
            </button>
            <div className="hidden sm:flex gap-5">
                <input
                    className="text-black rounded-md p-2"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                        const searchValue = e.target.value;
                        setTimeout(() => {
                            setSearchTerm(searchValue);
                            dispatch(searchReviews(searchValue));
                        }, 200);

                    }}
                />
            </div>
            <div className="flex sm:flex-col gap-2 ">
                <div className="flex gap-2">
                    {isLogin ? (
                        <>
                            <Link to={"userPage"}>
                                <button className="text-white border rounded-md p-2 ">{user!.username}</button>
                            </Link>
                            <button onClick={() => dispatch(logoutUser())}
                                    className="text-white border rounded-md p-2 ">Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="p-2 border rounded-md mr-2">Login</button>
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

        </div>
    );
};

export default Header;