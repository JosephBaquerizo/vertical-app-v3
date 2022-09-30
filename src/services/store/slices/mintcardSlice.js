import { createSlice } from '@reduxjs/toolkit';

const mintcardSlice = createSlice({
    name: 'mintcard',
    initialState: { 
        info: null,
    },
    reducers: {
        setMintCard(state, action) {
            state.info = action.payload;
        },
        removeMintCard(state) {
            state.info = null;
        },
    }
});

export const mintcardActions = mintcardSlice.actions;

export default mintcardSlice.reducer;