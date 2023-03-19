import { MessageTypes } from '@/types/enums/MessageTypes';
import { IRawUser, IUser } from './User';

export interface IRawMessage {
	type: MessageTypes;
	id: string;
	content: string;
	author: IRawUser;
	timestamp: number;
}

export interface IMessage {
	type: MessageTypes;
	id: string;
	content: string;
	author: IUser;
	timestamp: number;
}
