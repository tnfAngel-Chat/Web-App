import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';
import { IChannel, IRawChannel } from '@/types/interfaces/Channel';
import { IRawUser } from '@/types/interfaces/User';
import normalizeChannel from '@/util/normalizeChannel';
import { createSlice } from '@reduxjs/toolkit';

const users: IRawUser[] = [
	{
		type: UserTypes.User,
		id: '1',
		username: 'Ángel',
		status: UserStatusTypes.Online,
	},
	{
		type: UserTypes.User,
		id: '3',
		username: 'Juan',
		status: UserStatusTypes.DoNotDisturb,
		avatar: 'https://media.discordapp.net/attachments/770017179512471598/965703809366110268/makesweet-hn74h8.gif',
	},
	{
		type: UserTypes.User,
		id: '2',
		username: 'Lauty',
		status: UserStatusTypes.Idle,
		avatar: 'https://www.lavanguardia.com/files/og_thumbnail/uploads/2022/07/25/62de6567185fa.jpeg',
		presence: 'TKM',
	},
	{
		type: UserTypes.User,
		username: 'Julionete jose juan',
		id: '4',
		status: UserStatusTypes.Offline,
		avatar: 'https://cdn.discordapp.com/attachments/1012394358504431707/1081923094916120637/6201803e9abd9.jpeg',
	},
	{
		type: UserTypes.User,
		username: 'el pepe',
		id: '5',
		status: UserStatusTypes.Online,
		presence: 'Aver ijueputa mama binga que te pasa bobolon',
	},
];

const rawChannels: IRawChannel[] = [
	{
		type: ChannelTypes.DirectMessage,
		id: '22',
		recipient: users[1],
	},
	{
		type: ChannelTypes.DirectMessage,
		id: '11',
		recipient: users[2],
	},
	{
		type: ChannelTypes.DirectMessage,
		id: '33',
		recipient: users[3],
	},
	{
		type: ChannelTypes.Group,
		id: '44',
		icon: 'https://discord.com/assets/f90fca70610c4898bc57b58bce92f587.png',
		name: 'uwu',
		members: [users[0], users[2]],
	},
	{
		type: ChannelTypes.Group,
		id: '55',
		members: [users[0], users[3], users[2]],
	},
	{
		type: ChannelTypes.DirectMessage,
		id: '60',
		recipient: users[4],
	},
];

export type DirectChannelState = {
	channels: IChannel[];
	selectedChannelId: string | null;
	status: string;
};

const initialState: DirectChannelState = {
	channels: rawChannels.map(normalizeChannel),
	selectedChannelId: null,
	status: 'idle',
};

export const directChannelsSlice = createSlice({
	name: 'directChannels',
	initialState,
	reducers: {
		addChannel: (
			state,
			{ payload }: { type: string; payload: IChannel }
		) => {
			state.channels.push(payload);

			return state;
		},

		removeChannel: (
			state,
			{ payload }: { type: string; payload: string }
		) => {
			if (state.selectedChannelId === payload)
				state.selectedChannelId = null;

			state.channels = state.channels.filter(
				(channel) => channel.id !== payload
			);

			return state;
		},

		setSelectedChannel: (
			state,
			{ payload }: { type: string; payload: string }
		) => {
			state.selectedChannelId = payload;

			return state;
		},
	},
});

export const { addChannel, removeChannel, setSelectedChannel } =
	directChannelsSlice.actions;
export default directChannelsSlice.reducer;
