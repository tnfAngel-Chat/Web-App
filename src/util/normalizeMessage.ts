import { client } from '@/client';
import { MessageModes } from '@/types/enums/MessageModes';
import type { IMessage, IRawMessage } from '@/types/interfaces/Message';
import normalizeUser from './normalizeUser';

export default function normalizeMessage(message: IRawMessage): IMessage {
	return {
		...message,
		mode: message.mode ?? MessageModes.Sent,
		author: normalizeUser(client.users.resolve(message.author)),
	};
}
