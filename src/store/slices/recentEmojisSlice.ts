import { createSlice } from '@reduxjs/toolkit';

export type RecentEmojisState = {
	emojis: Record<string, number>;
};

const initialState: RecentEmojisState = {
	emojis: {},
};

export const recentEmojisSlice = createSlice({
	name: 'recentEmojis',
	initialState,
	reducers: {
		addRecentEmoji: (
			state,
			{ payload }: { type: string; payload: string }
		) => {
			state.emojis[payload] = (state.emojis[payload] ?? 0) + 1;

			return state;
		},
	},
});

export const { addRecentEmoji } = recentEmojisSlice.actions;
export default recentEmojisSlice.reducer;
