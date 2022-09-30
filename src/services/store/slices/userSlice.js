import { createSlice } from '@reduxjs/toolkit'; 

const userSlice = createSlice({
	name: 'user',
	initialState: { 
		address: null,
		balance: null,
		allowance: null,
	},
	reducers: {
		setAddress(state, action) {
			state.address = action.payload;
		},
		setBalance(state, action) {
			state.balance = action.payload;
		},
		setAllowance(state, action) {
			state.allowance = action.payload;
		},
		removeUser(state) {
			state.address = '';
			state.balance = null;
			state.allowance = null;
		},
	}
});

export const userActions = userSlice.actions;

export default userSlice.reducer;