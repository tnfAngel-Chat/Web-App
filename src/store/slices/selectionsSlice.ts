import { createSlice } from '@reduxjs/toolkit';

export type SelectedState = {
	selectedDirectChannel: string | null;
	selectedGuild: string | null;
	activePage: string | null;
	guilds: Record<string, string>;
};

const initialState: SelectedState = {
	selectedDirectChannel: null,
	selectedGuild: null,
	activePage: null,
	guilds: {},
};

export const selectionsSlice = createSlice({
	name: 'selections',
	initialState,
	reducers: {
		setSelectedChannel: (
			state,
			{
				payload,
			}: {
				type: string;
				payload: { guildId?: string; channelId: string | null };
			}
		) => {
			if (payload.guildId) {
				if (!payload.channelId) {
					delete state.guilds[payload.guildId];
				} else {
					state.guilds[payload.guildId] = payload.channelId;
				}
			} else {
				if (!payload.channelId) throw new Error('Invalid arguments');

				state.selectedDirectChannel = payload.channelId;
			}
			return state;
		},

		setSelectedGuild: (
			state,
			{
				payload,
			}: {
				type: string;
				payload: { guildId: string | null };
			}
		) => {
			state.selectedGuild = payload.guildId;

			return state;
		},

		setActivePage: (
			state,
			{
				payload,
			}: {
				type: string;
				payload: string;
			}
		) => {
			state.activePage = payload;
		},
	},
});

export const { setSelectedChannel, setSelectedGuild, setActivePage } =
	selectionsSlice.actions;
export default selectionsSlice.reducer;
