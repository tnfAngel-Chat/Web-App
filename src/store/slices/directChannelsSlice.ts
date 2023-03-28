import { IChannel } from '@/types/interfaces/Channel';
import { createSlice } from '@reduxjs/toolkit';

export type DirectChannelState = {
	channels: IChannel[];
	selectedChannelId: string | null;
	status: string;
};

const initialState: DirectChannelState = {
	channels: [],
	selectedChannelId: null,
	status: 'idle',
};

export const directChannelsSlice = createSlice({
	name: 'directChannels',
	initialState,
	reducers: {
		addChannel: (
			state,
			{ payload }: { type: string; payload: IChannel }
		) => {
			state.channels.push(payload);

			return state;
		},

		removeChannel: (
			state,
			{ payload }: { type: string; payload: string }
		) => {
			if (state.selectedChannelId === payload)
				state.selectedChannelId = null;

			state.channels = state.channels.filter(
				(channel) => channel.id !== payload
			);

			return state;
		},

		setSelectedChannel: (
			state,
			{ payload }: { type: string; payload: string }
		) => {
			state.selectedChannelId = payload;

			return state;
		},
	},
});

export const { addChannel, removeChannel, setSelectedChannel } =
	directChannelsSlice.actions;
export default directChannelsSlice.reducer;
