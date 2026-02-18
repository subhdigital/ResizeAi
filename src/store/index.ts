import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import imageReducer from './slices/imageSlice';
import creditsReducer from './slices/creditsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        image: imageReducer,
        credits: creditsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
