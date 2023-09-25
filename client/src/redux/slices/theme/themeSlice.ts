import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "../../store";


interface ThemeState {
    isDarkMode: boolean;
}

const initialState: ThemeState = {
    isDarkMode: true,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.isDarkMode = !state.isDarkMode;
        },
    },
})


export const themeSelector = (state: RootState) => state.theme.isDarkMode;
export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;