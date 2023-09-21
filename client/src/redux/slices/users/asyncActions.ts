import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {UserType} from "./types";
import {setUser} from "./userSlice";

export const registerUser = createAsyncThunk<void, { email: string, username: string, password: string }>(
    "user/registerUserStatus",
    async ({email, username, password}, {rejectWithValue, dispatch}) => {
        try {
            const response = await axios.post("http://localhost:5005/api/registration", {
                email,
                username,
                password,
            });

            await dispatch(loginUser({email, password}));

            return response.data;
        } catch (e: Error | any) {
            return rejectWithValue({errorMessage: e.message});
        }
    }
);

export const loginUser = createAsyncThunk<void, { email: string, password: string }>(
    "user/loginUserStatus",
    async ({email, password}, {rejectWithValue, dispatch}) => {
        try {
            const response = await axios.post("http://localhost:5005/api/login", {
                email,
                password,
            });

            const {token} = response.data;
            localStorage.setItem("token", token);
            await dispatch(fetchUser(email))

            return response.data;
        } catch (e: Error | any) {
            return rejectWithValue({errorMessage: e.message});
        }
    }
);

export const logoutUser = createAsyncThunk<void>(
    "user/logoutUserStatus",
    async (_, {rejectWithValue}) => {
        try {

            localStorage.removeItem("token");

        } catch (e: Error | any) {
            return rejectWithValue({errorMessage: e.message});
        }
    }
);

export const fetchUser = createAsyncThunk<UserType, string>(
    'user/fetchUsersStatus',
    async (email, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await axios.get(
                `http://localhost:5005/api/getUser/${email}`
            );
            dispatch(setUser())
            return data;
        } catch (e: any) {
            return rejectWithValue({errorMessage: e.message});
        }

    }
);

export const checkUser = createAsyncThunk<void, { userId: string, complete: boolean }>(
    'user/checkUserStatus',
    async ({userId, complete}, {rejectWithValue}) => {
        try {
            await axios.patch(
                `http://localhost:5005/api/check`,
                {_id: userId, complete}
            );
        } catch (e: Error | any) {
            return rejectWithValue(e.message);
        }
    }
);

export const checkAllUsers = createAsyncThunk<void>(
    'user/checkAllUsersStatus',
    async (_, {rejectWithValue}) => {
        try {
            await axios.patch(
                `http://localhost:5005/api/checkAll`
            );
        } catch (e: Error | any) {
            return rejectWithValue(e.message);
        }
    }
);

export const blockAllUsers = createAsyncThunk<void>(
    'user/blockAllUsersStatus',
    async (_, {rejectWithValue}) => {
        try {
            await axios.put(`http://localhost:5005/api/blockAll`);
        } catch (e: Error | any) {
            return rejectWithValue(e.message);
        }
    }
);

export const blockUser = createAsyncThunk<void, string>(
    'user/blockUserStatus',
    async (userId, {rejectWithValue}) => {
        try {
            await axios.put(
                `http://localhost:5005/api/block/${userId}`
            );
        } catch (e: Error | any) {
            return rejectWithValue(e.message);
        }
    }
);

export const deleteOneUser = createAsyncThunk<void, string>(
    'user/deleteOneUserStatus',
    async (userId, {rejectWithValue}) => {
        try {
            await axios.delete(
                `http://localhost:5005/api/deleteOne/${userId}`,
            );
        } catch (e: Error | any) {
            return rejectWithValue(e.message);
        }
    }
);

export const deleteCheckedUsers = createAsyncThunk<void>(
    'user/deleteCheckedUsersStatus',
    async (_, {rejectWithValue}) => {
        try {
            await axios.delete(
                `http://localhost:5005/api/deleteChecked`
            );
        } catch (e: Error | any) {
            return rejectWithValue(e.message);
        }
    }
);
