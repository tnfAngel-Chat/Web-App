import { MessageTypes } from '@/types/enums/MessageTypes';
import { IUser } from './User';

export interface IMessage {
	type: MessageTypes;
	id: string;
	content: string;
	author: IUser;
	timestamp: number;
}
