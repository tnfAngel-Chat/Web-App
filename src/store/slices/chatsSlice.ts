import type { IMessage } from '@/types/interfaces/Message';
import { createSlice } from '@reduxjs/toolkit';

export type ChatState = {
	chats: Record<string, IMessage[]>;
	inputs: Record<string, { content: string; attachments: any[] }>;
};

const initialState: ChatState = {
	chats: {},
	inputs: {},
};

export const chatsSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		setMessages: (
			state,
			{
				payload,
			}: {
				type: string;
				payload: { channelId: string; messages: IMessage[] };
			}
		) => {
			state.chats[payload.channelId] = payload.messages;

			return state;
		},
		addMessage: (
			state,
			{
				payload,
			}: {
				type: string;
				payload: { channelId: string; message: IMessage };
			}
		) => {
			const messages = state.chats[payload.channelId] ?? [];

			messages.push(payload.message);

			state.chats[payload.channelId] = messages;

			return state;
		},
		modifyMessage: (
			state,
			{
				payload,
			}: {
				type: string;
				payload: {
					channelId: string;
					messageId: string;
					newMessage: IMessage;
				};
			}
		) => {
			const messages = state.chats[payload.channelId];

			const index =
				messages?.findIndex(
					(message) => message.id === payload.messageId
				) ?? 0;

			if (messages) messages[index] = payload.newMessage;

			return state;
		},

		deleteMessage: (
			state,
			{
				payload,
			}: {
				type: string;
				payload: {
					channelId: string;
					messageId: string;
				};
			}
		) => {
			const messages = state.chats[payload.channelId] ?? [];

			state.chats[payload.channelId] = messages.filter(
				(message) => message.id !== payload.messageId
			);

			return state;
		},
		setMessageInput: (
			state,
			{
				payload,
			}: {
				type: string;
				payload: {
					channelId: string;
					input: { content: string; attachments: any[] };
				};
			}
		) => {
			state.inputs[payload.channelId] = payload.input;

			return state;
		},
		appendMessageInput: (
			state,
			{
				payload,
			}: {
				type: string;
				payload: {
					channelId: string;
					input: { content: string; attachments: any[] };
				};
			}
		) => {
			const messages = state.inputs[payload.channelId];

			if (messages) {
				messages.content += payload.input.content;

				messages.attachments = messages.attachments.concat(
					payload.input.attachments
				);
			}

			return state;
		},
	},
});

export const {
	setMessages,
	addMessage,
	modifyMessage,
	deleteMessage,
	setMessageInput,
	appendMessageInput,
} = chatsSlice.actions;
export default chatsSlice.reducer;
