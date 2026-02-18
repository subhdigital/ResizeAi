import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { getFingerprint } from '@/lib/fingerprint';

interface CreditsState {
    amount: number;
    deviceId: string | null;
    isAnonymous: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: CreditsState = {
    amount: 0,
    deviceId: null,
    isAnonymous: true,
    loading: false,
    error: null,
};

export const fetchCredits = createAsyncThunk(
    'credits/fetchCredits',
    async (_, { rejectWithValue }) => {
        try {
            const fingerprint = await getFingerprint();
            const response = await fetch('/api/credits/balance', {
                headers: {
                    'X-Device-Fingerprint': fingerprint
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch credits');
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deductLocalCredit = createAsyncThunk(
    'credits/deductLocalCredit',
    async (amount: number = 1, { getState, rejectWithValue }) => {
        // Optimistic update logic if needed
        return amount;
    }
);

const creditsSlice = createSlice({
    name: 'credits',
    initialState,
    reducers: {
        setCredits: (state, action: PayloadAction<number>) => {
            state.amount = action.payload;
        },
        updateCreditsAmount: (state, action: PayloadAction<number>) => { // Absolute set
            state.amount = action.payload;
        },
        decrementCredits: (state, action: PayloadAction<number>) => {
            state.amount = Math.max(0, state.amount - action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCredits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCredits.fulfilled, (state, action) => {
                state.loading = false;
                state.amount = action.payload.credits;
                state.isAnonymous = action.payload.isAnonymous;
                if (action.payload.deviceId) {
                    state.deviceId = action.payload.deviceId;
                }
            })
            .addCase(fetchCredits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCredits, updateCreditsAmount, decrementCredits } = creditsSlice.actions;
export const selectCredits = (state: RootState) => state.credits.amount;
export const selectIsAnonymous = (state: RootState) => state.credits.isAnonymous;

export default creditsSlice.reducer;
