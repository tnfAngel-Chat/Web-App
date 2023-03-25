import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { IRawUser, IUser } from './User';

export interface IBaseChannel {
	id: string;
}

export interface IRawTextChannel extends IBaseChannel {
	type: ChannelTypes.Text;
	name: string;
	icon?: string;
}

export interface ITextChannel extends IBaseChannel {
	type: ChannelTypes.Text;
	name: string;
	icon: string;
}

export interface IRawDirectMessageChannel extends IBaseChannel {
	type: ChannelTypes.DirectMessage;
	recipient: IRawUser;
}

export interface IDirectMessageChannel extends IBaseChannel {
	type: ChannelTypes.DirectMessage;
	recipient: IUser;
}

export interface IRawGroupChannel extends IBaseChannel {
	type: ChannelTypes.Group;
	name?: string;
	icon?: string;
	members: IRawUser[];
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
