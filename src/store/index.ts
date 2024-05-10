import { configureStore } from '@reduxjs/toolkit';

import channelsSlice from './slices/channelsSlice';
import chatsSlice from './slices/chatsSlice';
import collapsiblesSlice from './slices/collapsiblesSlice';
import guildsSlice from './slices/guildsSlice';
import recentEmojisSlice from './slices/recentEmojisSlice';
import selectionsSlice from './slices/selectionsSlice';
import themesSlice from './slices/themeSlice';
import connectionSlice from './slices/connectionSlice';

export const store = configureStore({
	reducer: {
		chats: chatsSlice,
		themes: themesSlice,
		recentEmojis: recentEmojisSlice,
		collapsibles: collapsiblesSlice,
		connection: connectionSlice,
		guilds: guildsSlice,
		channels: channelsSlice,
		selections: selectionsSlice
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
