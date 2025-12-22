import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
    Email: string | null;
    password: string | null;
    confirmpassword: string | null;
    username: string | null;
}

const initialState: AuthState = {
    Email: null,
    password: null,
    confirmpassword: null,
    username: null,
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
    },
});

export const { setEmail, setPassword, setConfirmPassword, setUsername } = userSlice.actions;
export default userSlice.reducer;