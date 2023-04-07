import { configureStore } from '@reduxjs/toolkit';

import chatsSlice from './slices/chatsSlice';
import themesSlice from './slices/themeSlice';
import recentEmojisSlice from './slices/recentEmojisSlice';
import collapsiblesSlice from './slices/collapsiblesSlice';
import guildsSlice from './slices/guildsSlice';
import channelsSlice from './slices/channelsSlice';
import selectionsSlice from './slices/selectionsSlice';

export const store = configureStore({
	reducer: {
		chats: chatsSlice,
		themes: themesSlice,
		recentEmojis: recentEmojisSlice,
		collapsibles: collapsiblesSlice,
		guilds: guildsSlice,
		channels: channelsSlice,
		selections: selectionsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
