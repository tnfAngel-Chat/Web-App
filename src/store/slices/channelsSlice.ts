import { Channel } from '@/types/interfaces/Channel';
import { createSlice } from '@reduxjs/toolkit';

export type ChannelsState = {
	channels: Channel[];
};

const initialState: ChannelsState = {
	channels: [],
};

export const channelsSlice = createSlice({
	name: 'guildChannels',
	initialState,
	reducers: {
		setChannels: (
			state,
			{ payload }: { type: string; payload: Channel[] }
		) => {
			state.channels = payload;

			return state;
		},

		addChannel: (
			state,
			{ payload }: { type: string; payload: Channel }
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
					newChannel: Channel;
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
			state.channels = state.channels.filter(
				(channel) => channel.id !== payload
			);

			return state;
		},
	},
});

export const { setChannels, addChannel, modifyChannel, removeChannel } =
	channelsSlice.actions;
export default channelsSlice.reducer;
