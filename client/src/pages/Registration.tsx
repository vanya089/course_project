import {registerUser} from "../redux/slices/users/asyncActions";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../redux/store";
import {useNavigate} from "react-router-dom";
import {userSelector} from "../redux/slices/users/userSlice";
import {themeSelector} from "../redux/slices/theme/themeSlice";

const Registration: React.FC = () => {
    const navigate = useNavigate();
    const isDarkMode = useSelector(themeSelector);
    const {isLogin} = useSelector(userSelector)
    const dispatch = useDispatch<AppDispatch>();

    const registrationFunc = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        dispatch(registerUser({
            email,
            username,
            password
        }));
    };

    useEffect(() => {
        if (isLogin) {
            navigate('/userPage');
        }
    }, [isLogin, navigate]);

    return (
        <div className="mx-auto my-40 h-[418px] w-[400px]">
            <form
                className={`flex flex-col ${isDarkMode ? 'border-teal-800' : 'border-blue-600'} justify-center gap-5 border-2 rounded-md `}
                onSubmit={registrationFunc}>
                <input className={`m-2 pl-2 text-white border rounded-md bg-black 
                ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`}
                       type='email'
                       id='email'
                       name='email'
                       placeholder='Enter your email'/>
                <input className={`m-2 pl-2 text-white border rounded-md bg-black 
                ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`}
                       id='username'
                       name='username'
                       placeholder="username"
                       type="text"/>
                <input className={`m-2 pl-2 text-white border rounded-md bg-black  
                ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`}
                       type='password'
                       id='password'
                       name='password'
                       placeholder='Enter your password'/>
                <button
                    className={`mx-40 mb-2 w-20 border-4 border-green-800 rounded-full hover:bg-green-600 transition ease-in-out
                    ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`}
                    name='log'
                    type='submit'
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Registration;