import { IChannel } from '@/types/interfaces/Channel';
import { createSlice } from '@reduxjs/toolkit';

export type ChannelState = {
	channels: IChannel[];
	selectedChannelId: string | null;
};

const initialState: ChannelState = {
	channels: [],
	selectedChannelId: null,
};

export const channelsSlice = createSlice({
	name: 'channels',
	initialState,
	reducers: {
		setChannels: (
			state,
			{ payload }: { type: string; payload: IChannel[] }
		) => {
			state.channels = payload;

			return state;
		},

		addChannel: (
			state,
			{ payload }: { type: string; payload: IChannel }
		) => {
			state.channels.push(payload);

			return state;
		},

		modifyChannel: (
			state,
			{
				payload,
			}: {
				type: string;
				payload: {
					channelId: string;
					newChannel: IChannel;
				};
			}
		) => {
			const index = state.channels.findIndex(
				(channel) => channel.id === payload.channelId
			);

			state.channels[index] = payload.newChannel;

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

export const {
	setChannels,
	addChannel,
	modifyChannel,
	removeChannel,
	setSelectedChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
