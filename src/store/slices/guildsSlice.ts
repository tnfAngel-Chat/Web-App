import type { IGuild } from '@/types/interfaces/Guild';
import { createSlice } from '@reduxjs/toolkit';

export type GuildsState = {
	guilds: IGuild[];
};

const initialState: GuildsState = {
	guilds: []
};

export const guildsSlice = createSlice({
	name: 'guildGuilds',
	initialState,
	reducers: {
		setGuilds: (state, { payload }: { type: string; payload: IGuild[] }) => {
			state.guilds = payload;

			return state;
		},

		addGuild: (state, { payload }: { type: string; payload: IGuild }) => {
			state.guilds.push(payload);

			return state;
		},

		modifyGuild: (
			state,
			{
				payload
			}: {
				type: string;
				payload: {
					channelId: string;
					newGuild: IGuild;
				};
			}
		) => {
			const index = state.guilds.findIndex((channel) => channel.id === payload.channelId);

			state.guilds[index] = payload.newGuild;

			return state;
		},

		removeGuild: (state, { payload }: { type: string; payload: string }) => {
			state.guilds = state.guilds.filter((channel) => channel.id !== payload);

			return state;
		}
	}
});

export const { setGuilds, addGuild, modifyGuild, removeGuild } = guildsSlice.actions;
export default guildsSlice.reducer;
