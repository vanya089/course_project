import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {


    return (
        <div className="container min-h-[800px] mx-auto my-10 bg-black border-2 border-teal-800 rounded-lg ">
            <Header/>
            <Routes>
                <Route element={<PrivateRoute/>}>
                    <Route path="/" element={<Home/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
