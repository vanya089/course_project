import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../store'
import {
    blockAllUsers,
    checkAllUsers,
    checkUser,
    deleteCheckedUsers,
    deleteOneUser,
    fetchUser,
} from "./asyncActions";
import {Status, UserState, UserType} from "./types";


const initialState: UserState = {
    user: {
        _id: "",
        username: "",
        email: "",
        password: "",
        roles:[]
    },
    isLogin: false,
    status: Status.LOADING,
    error: null

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state) {
            state.isLogin = !state.isLogin;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = Status.LOADING;
            state.user = {} as UserType;
            state.error = null;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.user = {} as UserType;
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
        builder.addCase(blockAllUsers.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
        builder.addCase(checkUser.rejected, (state, action) => {
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
        builder.addCase(checkAllUsers.rejected, (state, action) => {
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
        builder.addCase(deleteOneUser.rejected, (state, action) => {
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
        builder.addCase(deleteCheckedUsers.rejected, (state, action) => {
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
    }
})


export const userSelector = (state: RootState) => state;
export const {setUser} = userSlice.actions;
export default userSlice.reducer;