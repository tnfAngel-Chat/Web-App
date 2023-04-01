import { configureStore } from '@reduxjs/toolkit';

import chatsSlice from './slices/chatsSlice';
import themesSlice from './slices/themeSlice';
import recentEmojisSlice from './slices/recentEmojisSlice';
import collapsiblesSlice from './slices/collapsiblesSlice';
import directChannelsSlice from './slices/directChannelsSlice';

export const store = configureStore({
	reducer: {
		chats: chatsSlice,
		themes: themesSlice,
		recentEmojis: recentEmojisSlice,
		collapsibles: collapsiblesSlice,
		directChannels: directChannelsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
