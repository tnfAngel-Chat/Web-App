import { IMessage } from '@/types/interfaces/Message';
import { Collection } from '@discordjs/collection';
import { Client } from '..';
import { BaseManager } from './BaseManager';

export class MessagesManager extends BaseManager<IMessage> {
	constructor(client: Client) {
		super(client);
	}

	cache = new Collection<string, IMessage>();
}
