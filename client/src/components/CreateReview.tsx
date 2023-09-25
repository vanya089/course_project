import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../redux/store";
import {createReview} from "../redux/slices/reviews/asyncActions";
import {useNavigate} from "react-router-dom";
import {themeSelector} from "../redux/slices/theme/themeSlice";

const CreateReview: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isDarkMode = useSelector(themeSelector);

    const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const imageInput = document.getElementById("file") as HTMLInputElement;
        if (!imageInput || !imageInput.files || imageInput.files.length === 0) {
            alert("Please select an image file.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const year = formData.get('year') as string;
        const genre = formData.get('genre') as string;
        const description = formData.get('description') as string;
        const image = formData.get("file") as File | null;

        if (!title || !year || !genre || !description || !image) {
            alert("Please fill out all fields and select an image.");
            return;
        }


        dispatch(createReview({
            title,
            year,
            genre,
            description,
            image,
        }));

        navigate('/userPage');
    };


    return (
        <div className="mx-auto my-40 h-[390px] w-[400px]">
            <form
                className="flex flex-col gap-5"
                encType="multipart/form-data"
                onSubmit={formHandler}
            >
                <input className={`text-black border px-2 rounded 
                ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`}
                       type="text"
                       placeholder="title"
                       id="title"
                       name="title"/>
                <input className={`text-black border px-2 rounded 
                ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`}
                       type="text"
                       placeholder="year"
                       id="year"
                       name="year"/>
                <input className={`text-black border px-2 rounded 
                ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`}
                       type="text"
                       placeholder="genre"
                       id="genre"
                       name="genre"/>
                <textarea className={`text-black border px-2 rounded 
                ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`}
                          placeholder="description"
                          id="description"
                          name="description">
                </textarea>
                <input className={`${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`} type="file" placeholder="file" id="file" name="file"/>
                <button className={`border rounded-md mx-24 ${isDarkMode ? 'text-white bg-black' : 'text-black bg-gray-100 border-black'}`} type="submit">Send</button>
            </form>
        </div>
    );
};

export default CreateReview;

