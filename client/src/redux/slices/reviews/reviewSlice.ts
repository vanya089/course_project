import {ReviewState, ReviewType, Status} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import {fetchReviews, searchReviews} from "./asyncActions";


const initialState: ReviewState = {
    reviews: [],
    status: Status.LOADING,
    error: null,
    searchResults: [],
};

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setReviews(state, action: PayloadAction<ReviewType[]>) {
            state.reviews = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
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
        builder.addCase(searchReviews.pending, (state) => {
            state.status = Status.LOADING;
            state.searchResults = [];
            state.error = null;
        });
        builder.addCase(searchReviews.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.searchResults = action.payload;
            state.error = null;
        });
        builder.addCase(searchReviews.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
    },
})
export const reviewSelector = (state: RootState) => state.reviews
export const {setReviews, setSearchResults} = reviewSlice.actions
export default reviewSlice.reducer