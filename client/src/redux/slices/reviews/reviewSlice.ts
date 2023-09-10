import {ReviewState, ReviewType, Status} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";


const initialState: ReviewState = {
    reviews: [],
    status: Status.LOADING,
    error: null

};

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setReviews(state, action: PayloadAction<ReviewType[]>) {
            state.reviews = action.payload;
        },
    },
})
export const reviewSelector = (state: RootState) => state.reviews
export const {setReviews} = reviewSlice.actions
export default reviewSlice.reducer