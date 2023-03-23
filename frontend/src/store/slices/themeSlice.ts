import { Theme, themes } from '@/constants/themes';

import { createSlice } from '@reduxjs/toolkit';

export type ThemeState = {
	theme: Theme;
};


const initialState: ThemeState = {
	theme: themes[0],
};

export const themesSlice = createSlice({
	name: 'themes',
	initialState,
	reducers: {
		setTheme: (
			state,
			{
				payload,
			}: {
				type: string;
				payload: Theme;
			}
		) => {
			state.theme = payload;

			return state;
		},
	},
});

export const { setTheme } = themesSlice.actions;
export default themesSlice.reducer;
