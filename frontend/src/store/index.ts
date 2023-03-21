import { configureStore } from '@reduxjs/toolkit';

import chatsSlice from './slices/chatsSlice';
import directChannelsSlice from './slices/directChannelsSlice';

export const store = configureStore({
	reducer: {
		chats: chatsSlice,
		directChannels: directChannelsSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
