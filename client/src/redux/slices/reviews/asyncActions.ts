import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const createReview = createAsyncThunk<void, {
    title: string;
    year: string;
    genre: string;
    description: string;
    image: File;
}>(
    "review/createReview",
    async ({title, year, genre, description, image}, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("year", year);
            formData.append("genre", genre);
            formData.append("description", description);
            formData.append("file", image);

            const response = await axios.post("http://localhost:5005/api/createReview", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        } catch (e: any) {
            return rejectWithValue({errorMessage: e.message});
        }
    }
);