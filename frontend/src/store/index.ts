import { configureStore } from '@reduxjs/toolkit';

import chatsSlice from './slices/chatsSlice';
import directChannelsSlice from './slices/directChannelsSlice';
import themesSlice from './slices/themeSlice';
import storage from 'redux-persist/lib/storage';
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage,
};

export const store = configureStore({
	reducer: {
		chats: persistReducer(persistConfig, chatsSlice),
		themes: persistReducer(persistConfig, themesSlice),
		directChannels: persistReducer(persistConfig, directChannelsSlice),
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself

export const persistor = persistStore(
	store
);
