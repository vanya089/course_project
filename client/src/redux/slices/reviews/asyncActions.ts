import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {TokenService} from "./token-service";
import {UserType} from "../users/types";
import {setUser} from "../users/userSlice";
import {ReviewType} from "./types";

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
                    "Authorization": TokenService.getToken("token"),
                },
            });

            return response.data;
        } catch (e: Error | any) {
            return rejectWithValue({errorMessage: e.message});
        }
    }
);

export const fetchReviews = createAsyncThunk<ReviewType[]>(
    'review/fetchReviews',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(
                `http://localhost:5005/api/getReviews`,
            );

            return data;
        } catch (e: any) {
            return rejectWithValue({errorMessage: e.message});
        }

    }
);
export const searchReviews = createAsyncThunk<[],string>(
    'reviews/searchReviews',
    async (searchTerm, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5005/api/reviews/search?query=${searchTerm}`);
            return response.data;
        } catch (e: any) {
            return rejectWithValue({ errorMessage: e.message });
        }
    }
);