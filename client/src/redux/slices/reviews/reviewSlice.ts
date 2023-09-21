import {ReviewState, ReviewType, Status} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import {fetchReviews} from "./asyncActions";


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
    extraReducers: (builder) => {
        builder.addCase(fetchReviews.pending, (state) => {
            state.status = Status.LOADING;
            state.reviews = [];
            state.error = null;
        });
        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.reviews = action.payload;
            state.error = null;
        });
        builder.addCase(fetchReviews.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
    },
})
export const reviewSelector = (state: RootState) => state.reviews
export const {setReviews} = reviewSlice.actions
export default reviewSlice.reducer