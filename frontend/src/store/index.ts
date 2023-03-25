import { configureStore } from '@reduxjs/toolkit';

import chatsSlice from './slices/chatsSlice';
import directChannelsSlice from './slices/directChannelsSlice';
import themesSlice from './slices/themeSlice';

export const store = configureStore({
	reducer: {
		chats: chatsSlice,
		themes: themesSlice,
		directChannels: directChannelsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
