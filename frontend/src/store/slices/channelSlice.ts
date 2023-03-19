import { createSlice } from '@reduxjs/toolkit';

export interface ChannelState {
	channels: any[];
}


const initialState: ChannelState = {
	channels: [],
};

export const channelSlice = createSlice({
	name: 'channel',
	initialState,
	reducers: {
		add(state, action) {
			const { rooms: channels } = action.payload;
			return {
				...state,
				channels: [...channels],
			};
		},
	},
});

export const { add } = channelSlice.actions;
export default channelSlice.reducer;

