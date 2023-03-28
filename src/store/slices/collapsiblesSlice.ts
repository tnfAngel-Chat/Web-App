import { createSlice } from '@reduxjs/toolkit';

export type CollapsiblesState = {
	showChannelMembers: boolean;
};

const initialState: CollapsiblesState = {
	showChannelMembers: true,
};

export const collapsiblesSlice = createSlice({
	name: 'collapsibles',
	initialState,
	reducers: {
		toggleChannelMembers: (state) => {
			state.showChannelMembers = !state.showChannelMembers;

			return state;
		},
	},
});

export const { toggleChannelMembers } = collapsiblesSlice.actions;
export default collapsiblesSlice.reducer;
