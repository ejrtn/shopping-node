import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        isLoggedIn: false,
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.userId = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setUserId, logout } = userSlice.actions;
export default userSlice.reducer;