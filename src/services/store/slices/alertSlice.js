import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
    name: 'alert',
    initialState: { 
        show: false,
        message: '',
        type: '' 
    },
    reducers: {
        setAlert(state, action) {
            state.show = action.payload;
        },
        setMessage(state, action) {
            state.message = action.payload;
        },
        setType(state, action) {
            state.type = action.payload;
        }
    }
});

export const alertActions = alertSlice.actions;

export default alertSlice.reducer;