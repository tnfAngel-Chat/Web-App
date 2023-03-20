import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './slices/chatSlice';
import directChannelsSlice from './slices/directChannelsSlice';

export const store = configureStore({
	reducer: {
		chat: chatSlice,
		directChannels: directChannelsSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
