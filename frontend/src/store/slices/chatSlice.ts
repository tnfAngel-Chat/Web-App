import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: 0,
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		add: (state) => {
			state.value += 1;
		},
	},
});

export const { add } = chatSlice.actions;
export default chatSlice.reducer;
