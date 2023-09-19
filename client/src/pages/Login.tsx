import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import {loginUser} from "../redux/slices/users/asyncActions";

import {AiFillFacebook, AiOutlineGoogle} from "react-icons/ai";



const Login: React.FC = () => {
        const dispatch = useDispatch<AppDispatch>()

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

        return (
            <div className="mx-auto my-40 h-[418px] w-[400px]">
                <form className="flex flex-col justify-center gap-5 border-2 border-teal-800 rounded-md" onSubmit={loginFunc}>
                    <div className=" relative flex flex-col justify-center text-center">
                        <div className="mx-auto flex justify-center gap-3 my-4 h-8 w-40 border-2 rounded-full w-40">
                            <AiOutlineGoogle size={25}/>
                            <p>Google</p>
                        </div>
                        <div className="mx-auto mb-10 flex justify-center gap-3 my-4 h-8 w-40 border-2 rounded-full w-40">
                            <AiFillFacebook size={25}/>
                            <p>Facebook</p>
                        </div>
                        <hr className="mx-8"/>
                        <div className="px-2 absolute left-[100px] top-[139px] bg-black">Or with email and password</div>
                    </div>
                    <input className="m-2 pl-2 text-white text-black border rounded-md bg-black" type="email" id="email" name="email"
                           placeholder="Enter your email"/>
                    <input className="m-2 pl-2 text-white text-black border rounded-md bg-black" type="password" id="password"
                           name="password" placeholder="Enter your password"/>
                    <button
                        className="mx-40 w-20 border-4 border-green-800 rounded-full hover:bg-green-600 transition ease-in-out"
                        name="log">Sign In
                    </button>
                    <Link className="mx-20 mb-1" to={'/registration'}>
                        Don't have account, <b>Sign Up!</b>
                    </Link>
                </form>
            </div>
        );
};


export default Login;