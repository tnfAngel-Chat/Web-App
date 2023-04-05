import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { IUser } from './User';

export interface IBaseChannel {
	id: string;
}

export interface IRawTextChannel extends IBaseChannel {
	type: ChannelTypes.Text;
	name: string;
	icon?: string | null;
	lastMessage?: string | null;
}

export interface ITextChannel extends IBaseChannel {
	type: ChannelTypes.Text;
	name: string;
	icon: string;
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
	members: string[];
	lastMessage?: string | null;
}

export interface IGroupChannel extends IBaseChannel {
	type: ChannelTypes.Group;
	name: string;
	icon: string;
	members: IUser[];
	lastMessage: string | null;
}

export type IRawChannel =
	| IRawTextChannel
	| IRawDirectMessageChannel
	| IRawGroupChannel;
export type IChannel = ITextChannel | IDirectMessageChannel | IGroupChannel;
