import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
    Email: string | null;
    password: string | null;
    confirmpassword: string | null;
    username: string | null;
    addTransactionPopup: boolean;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    Email: null,
    password: null,
    confirmpassword: null,
    username: null,
    addTransactionPopup: false,
    accessToken: null,
    refreshToken: null
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.Email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action: PayloadAction<string>) => {
            state.confirmpassword = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setAddTransactionPopup: (state, action: PayloadAction<boolean>) => {
            state.addTransactionPopup = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
        },
        clearUserData: (state) => {
            state.Email = null;
            state.password = null;
            state.confirmpassword = null;
            state.username = null;
            state.addTransactionPopup = false;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { setEmail, setPassword, setConfirmPassword, setUsername, setAddTransactionPopup, setAccessToken, setRefreshToken, clearUserData } = userSlice.actions;
export default userSlice.reducer;