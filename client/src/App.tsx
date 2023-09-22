import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Route, Routes} from "react-router-dom";
import {adminRoutes, publicRoutes, userRoutes} from "./router/router";
import {useSelector} from "react-redux";
import {userSelector} from "./redux/slices/users/userSlice";

function App() {
    const {user} = useSelector(userSelector);
    const isUser = user && user.user.roles && user.user.roles.includes("USER");
    const isAdmin = user && user.user.roles && user.user.roles.includes("ADMIN");

    return (
        <div className="container min-h-[800px] mx-auto my-10 bg-black border-2 border-teal-800 rounded-lg ">
            <Header/>
            <Routes>
                {isUser && userRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))}
                {isAdmin
                    && adminRoutes.map(({path, Component}) => (
                        <Route key={path} path={path} element={<Component/>}/>
                    ))
                    && userRoutes.map(({path, Component}) => (
                        <Route key={path} path={path} element={<Component/>}/>
                    ))}
                {publicRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))}
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;

