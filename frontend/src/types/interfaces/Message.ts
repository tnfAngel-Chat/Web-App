import { MessageTypes } from '@/types/enums/MessageTypes';
import { MessageModes } from '../enums/MessageModes';
import { IRawUser, IUser } from './User';

export interface IRawMessage {
	type: MessageTypes;
	mode: MessageModes;
	id: string;
	content: string;
	author: IRawUser;
	timestamp: number;
}

export interface IMessage {
	type: MessageTypes;
	mode: MessageModes;
	id: string
	content: string;
	author: IUser;
	timestamp: number;
}
