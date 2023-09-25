import {configureStore} from '@reduxjs/toolkit';
import user from './slices/users/userSlice';
import reviews from './slices/reviews/reviewSlice';
import theme from './slices/theme/themeSlice';

export const store = configureStore({
    reducer: {
        user,
        reviews,
        theme,
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch