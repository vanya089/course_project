import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../redux/store";
import {loginUser} from "../redux/slices/users/asyncActions";

import {AiOutlineGoogle, AiOutlineTwitter} from "react-icons/ai";
import {userSelector} from "../redux/slices/users/userSlice";
import {themeSelector} from "../redux/slices/theme/themeSlice";


const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const {isLogin} = useSelector(userSelector)
    const isDarkMode = useSelector(themeSelector);


    const loginFunc = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        dispatch(loginUser({
            email,
            password
        }))
    }


    useEffect(() => {
        if (isLogin) {
            navigate('/userPage');
        }
    }, [isLogin, navigate]);

    return (
        <div className="mx-auto my-40 h-[418px] w-[400px]">
            <form
                className={`flex flex-col justify-center gap-5 border-2 ${isDarkMode ? 'border-teal-800' : 'border-blue-600'} rounded-md`}
                onSubmit={loginFunc}>
                <div className=" relative flex flex-col justify-center text-center">
                    <div
                        className={`mx-auto flex justify-center gap-3 my-4 h-8 w-40 border-2 
                        ${isDarkMode ? 'text-white border-white' : 'text-black border-black'}  rounded-full w-40`}>
                        <AiOutlineGoogle size={25}/>
                        <p>Google</p>
                    </div>
                    <div
                        className={`mx-auto mb-10 flex justify-center gap-3 my-4 h-8 w-40 border-2 
                        ${isDarkMode ? 'text-white border-white' : 'text-black border-black'} rounded-full w-40`}>
                        <AiOutlineTwitter size={25}/>
                        <p>Twitter</p>
                    </div>
                    <hr className={`mx-8  ${isDarkMode ? 'border-white' : 'border-black'}`}/>
                    <div
                        className={`px-2 absolute left-[100px] top-[139px]  ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100'}`}>
                        Or with email and password
                    </div>
                </div>
                <input
                    className={`m-2 pl-2 border rounded-md ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"/>
                <input
                    className={`m-2 pl-2 border rounded-md ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"/>
                <button
                    className={`mx-40 w-20 border-4 border-green-800 rounded-full hover:bg-green-600 
                    transition ease-in-out ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`}
                    name="log">Sign In
                </button>
                <Link
                    className={`mx-20 mb-1 ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`}
                    to={'/registration'}>
                    Don't have account, <b>Sign Up!</b>
                </Link>

            </form>
        </div>
    );
};


export default Login;