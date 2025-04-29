import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import axios from "axios";

interface UserState {
    user_id: number | null;
    fullname: string | null;
    permission: string | null;
}

const initialState: UserState = {
    user_id: null,
    fullname: null,
    permission: null,
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/auth/status`, { withCredentials: true });

        if (data.authenticated && data.user && typeof data.user === "object") {
            const { user_id, fullname, permission } = data.user;
            if (typeof user_id === "number" && typeof fullname === "string" && typeof permission === "string") {
                return { user_id, fullname, permission };
            }
        }

        return rejectWithValue("Invalid user data");
    } catch
        // (error)
    {
        // console.log("Auth check failed:", error);
        return rejectWithValue("Auth check failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // ✅ Cho phép cập nhật auth khi user login thành công
        loginSuccess: (state, action: PayloadAction<UserState>) => {
            state.user_id = action.payload.user_id;
            state.fullname = action.payload.fullname;
            state.permission = action.payload.permission;
        },
        logout: (state) => {
            state.user_id = null;
            state.fullname = null;
            state.permission = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.fulfilled, (state, action: PayloadAction<UserState>) => {
                state.user_id = action.payload.user_id;
                state.fullname = action.payload.fullname;
                state.permission = action.payload.permission;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.user_id = null;
                state.fullname = null;
                state.permission = null;
            });
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;