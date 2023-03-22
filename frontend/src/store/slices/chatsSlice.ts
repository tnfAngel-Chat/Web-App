import { MessageModes } from '@/types/enums/MessageModes';
import { MessageTypes } from '@/types/enums/MessageTypes';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';
import { IMessage, IRawMessage } from '@/types/interfaces/Message';
import { IRawUser } from '@/types/interfaces/User';
import normalizeMessage from '@/util/normalizeMessage';
import { createSlice } from '@reduxjs/toolkit';

type ChatState = {
	chats: Record<string, IMessage[]>;
	inputs: Record<string, string>;
};

const rawAuthor: IRawUser = {
	type: UserTypes.User,
	id: '1',
	username: 'Lauty',
	avatar: 'https://cdn.discordapp.com/avatars/456361646273593345/b3d4494a50c05f2a3fe2e4ca68b4a741.webp',
	status: UserStatusTypes.Online,
};

const rawDest: IRawUser = {
	type: UserTypes.User,
	id: '2',
	username: 'Angelito',
	avatar: 'https://media.discordapp.net/attachments/866159939247931432/1060336031234277407/plink.gif',
	status: UserStatusTypes.Idle,
};

const rawMessagesT: IRawMessage[] = [
	{
		type: MessageTypes.Text,
		mode: MessageModes.Sent,
		id: 's',
		content: 'holaa',
		author: rawAuthor,
		timestamp: Date.now(),
	},
	{
		type: MessageTypes.Text,
		mode: MessageModes.Sent,
		id: '3',
		content: 'pruba',
		author: rawAuthor,
		timestamp: Date.now(),
	},
];

const chats = {
	'22': rawMessagesT.map((rawMessage) => normalizeMessage(rawMessage)),
	'11': (
		[
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawDest,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawDest,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawDest,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawDest,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawDest,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
		] as IRawMessage[]
	).map(normalizeMessage),
	'44': (
		[
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba mensaje de abajo',
				author: rawAuthor,
				timestamp: Date.now(),
			},
		] as IRawMessage[]
	).map(normalizeMessage),
	'55': (
		[
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: 's',
				content: 'holaa',
				author: rawAuthor,
				timestamp: Date.now(),
			},
			{
				type: MessageTypes.Text,
				mode: MessageModes.Sent,
				id: '3',
				content: 'pruba',
				author: rawAuthor,
				timestamp: Date.now(),
			},
		] as IRawMessage[]
	).map(normalizeMessage),
};

const initialState: ChatState = {
	chats: chats,
	inputs: {},
};

export const chatsSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
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
			const messages = state.chats[payload.channelId] ?? [];

			const index = messages.findIndex(
				(message) => message.id === payload.messageId
			);

			state.chats[payload.channelId][index] = payload.newMessage;

			return state;
		},
		setMessageInput: (
			state,
			{
				payload,
			}: {
				type: string;
				payload: { channelId: string; content: string };
			}
		) => {
			state.inputs[payload.channelId] = payload.content;

			return state;
		},
	},
});

export const { addMessage, modifyMessage, setMessageInput } =
	chatsSlice.actions;
export default chatsSlice.reducer;
