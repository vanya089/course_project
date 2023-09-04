import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="flex items-center justify-around font-bold bg-blue-500 h-20 rounded-md">
            <h1 className="text-3xl">
                Best choice!
            </h1>
            <Link to={"/login"} ><button className="border-2 rounded-md">Sign In</button></Link>
           <Link to={"/registration"}><button className="border-2 rounded-md">Sign Up</button></Link>
        </div>

    );
};

export default Header;