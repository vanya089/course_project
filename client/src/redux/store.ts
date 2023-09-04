import { configureStore } from '@reduxjs/toolkit';
import users from './slices/users/userSlice';
import reviews from './slices/reviews/reviewSlice';

export const store = configureStore({
    reducer: {
        users,
        reviews,
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch