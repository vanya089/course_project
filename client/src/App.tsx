import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {


    return (
        <div className="container mx-auto ">
            <Header/>
            <Home/>
            <Footer/>
        </div>
    );
}

export default App;
