import { createSlice } from '@reduxjs/toolkit';

const goldcardSlice = createSlice({
    name: 'goldcard',
    initialState: { 
        selectedCards: [],
    },
    reducers: {
        setCards(state, action) {
            state.selectedCards = action.payload;
        },
    }
});

export const goldcardActions = goldcardSlice.actions;

export default goldcardSlice.reducer;