import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { IUser } from './User';

export interface IBaseChannel {
	id: string;
}

export interface ITextChannel extends IBaseChannel {
	type: ChannelTypes.Text;
	name: string;
}

export interface IDirectMessageChannel extends IBaseChannel {
	type: ChannelTypes.DirectMessage;
	recipient: IUser;
}

export interface IGroupChannel extends IBaseChannel {
	type: ChannelTypes.Group;
	members: IUser[];
}

export type IChannel = ITextChannel | IDirectMessageChannel | IGroupChannel;
