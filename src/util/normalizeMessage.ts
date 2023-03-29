import { client } from '@/client';
import { IMessage, IRawMessage } from '@/types/interfaces/Message';
import normalizeUser from './normalizeUser';

export default function normalizeMessage(message: IRawMessage): IMessage {
	return {
		...message,
		author: normalizeUser(client.users.resolve(message.author)),
	};
}
