import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: 0,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		add: (state) => {
			state.value += 1;
		},
	},
});

export const { add } = userSlice.actions;
export default userSlice.reducer;
