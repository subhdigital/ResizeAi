import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface User {
    id: string;
    name: string;
    email: string;
    plan: string;
    creditsRemaining: number;
    apiKey: string;
    role: string;
    subscriptionStatus?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        updateCredits: (state, action: PayloadAction<number>) => {
            if (state.user) {
                state.user.creditsRemaining = action.payload;
            }
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
        });
    },
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
});

export const { setUser, updateCredits, updateUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
