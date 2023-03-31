import { MessageTypes } from '@/types/enums/MessageTypes';
import { MessageModes } from '../enums/MessageModes';
import { IUser } from './User';

export interface IRawMessage {
	type: MessageTypes;
	mode?: MessageModes;
	id: string;
	nonce: string;
	author: string;
	content: string;
	channelId: string;
	timestamp: number;
}

export interface IMessage {
	type: MessageTypes;
	mode: MessageModes;
	id: string;
	nonce: string;
	author: IUser;
	content: string;
	channelId: string;
	timestamp: number;
}
