import { ChannelTypes } from '@/types/enums/ChannelTypes';
import type { IUser } from './User';

export interface IBaseChannel {
	id: string;
}

export interface IRawTextChannel extends IBaseChannel {
	type: ChannelTypes.Text;
	guildId: string;
	parentId?: string | null;
	name: string;
	topic: string;
	icon?: string | null;
	position: number;
	lastMessage?: string | null;
}

export interface ITextChannel extends IBaseChannel {
	type: ChannelTypes.Text;
	guildId: string;
	parentId: string | null;
	name: string;
	topic: string;
	icon: string;
	position: number;
	lastMessage: string | null;
}

export interface IRawDirectMessageChannel extends IBaseChannel {
	type: ChannelTypes.DirectMessage;
	recipient: string;
	lastMessage?: string | null;
}

export interface IDirectMessageChannel extends IBaseChannel {
	type: ChannelTypes.DirectMessage;
	recipient: string;
	lastMessage: string | null;
}

export interface IRawGroupChannel extends IBaseChannel {
	type: ChannelTypes.Group;
	name?: string | null;
	icon?: string | null;
	recipients: string[];
	lastMessage?: string | null;
}

export interface IGroupChannel extends IBaseChannel {
	type: ChannelTypes.Group;
	name: string;
	icon: string;
	recipients: IUser[];
	lastMessage: string | null;
}

export type IRawChannel = IRawTextChannel | IRawDirectMessageChannel | IRawGroupChannel;

export type Channel = ITextChannel | IDirectMessageChannel | IGroupChannel;

export type DirectBasedChannel = IDirectMessageChannel | IGroupChannel;
export type GuildBasedChannel = ITextChannel;
