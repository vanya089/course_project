import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Route, Routes} from "react-router-dom";
import {adminRoutes, publicRoutes, userRoutes} from "./router/router";
import {useSelector} from "react-redux";
import {userSelector} from "./redux/slices/users/userSlice";
import {themeSelector} from "./redux/slices/theme/themeSlice";

const App: React.FC = () => {
    const isDarkMode = useSelector(themeSelector);
    const {user} = useSelector(userSelector);
    const isUser = user && user.roles && user.roles.includes("USER");
    const isAdmin = user && user.roles && user.roles.includes("ADMIN");


    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.remove('light');
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
        }
    }, [isDarkMode]);



    return (
        <div
            className={`container min-h-[800px] mx-auto my-10 
             ${isDarkMode ? 'bg-black' : 'bg-gray-100'}  border-2
             ${isDarkMode ? 'border-teal-800' : 'border-blue-600'} rounded-lg`}>
            <Header/>
            <Routes>
                {isUser
                    && userRoutes.map(({path, Component}) => (
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

