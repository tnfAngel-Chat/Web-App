import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { IRawUser, IUser } from './User';

export interface IBaseChannel {
	id: string;
}

export interface IRawTextChannel extends IBaseChannel {
	type: ChannelTypes.Text;
	name: string;
	icon?: string | null;
}

export interface ITextChannel extends IBaseChannel {
	type: ChannelTypes.Text;
	name: string;
	icon: string;
}

export interface IRawDirectMessageChannel extends IBaseChannel {
	type: ChannelTypes.DirectMessage;
	recipient: string;
}

export interface IDirectMessageChannel extends IBaseChannel {
	type: ChannelTypes.DirectMessage;
	recipient: string;
}

export interface IRawGroupChannel extends IBaseChannel {
	type: ChannelTypes.Group;
	name?: string | null;
	icon?: string | null;
	members: string[];
}

export interface IGroupChannel extends IBaseChannel {
	type: ChannelTypes.Group;
	name: string;
	icon: string;
	members: IUser[];
}

export type IRawChannel =
	| IRawTextChannel
	| IRawDirectMessageChannel
	| IRawGroupChannel;
export type IChannel = ITextChannel | IDirectMessageChannel | IGroupChannel;
