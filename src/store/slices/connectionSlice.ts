import { createSlice } from '@reduxjs/toolkit';

export type ConnectionState = {
	isConnected: boolean;
};

const initialState: ConnectionState = {
	isConnected: false
};

export const connectionSlice = createSlice({
	name: 'connection',
	initialState,
	reducers: {
		setConnected: (
			state,
			{
				payload
			}: {
				type: string;
				payload: boolean;
			}
		) => {
			state.isConnected = payload;

			return state;
		}
	}
});

export const { setConnected } = connectionSlice.actions;
export default connectionSlice.reducer;
