import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="flex items-center justify-between font-bold bg-teal-800 h-20 px-6 rounded-md">
            <Link to={"/"}>
                <h1 className="text-3xl">Best choice!</h1>
            </Link>
            <div className="flex gap-2">
                <Link to={"/login"}>
                    <button className="p-2 border rounded-md">Sign In</button>
                </Link>
                <Link to={"/registration"}>
                    <button className="p-2 border-2 rounded-md"><b>Sign Up</b></button>
                </Link>
            </div>

        </div>

    );
};

export default Header;