import { Client } from '..';
import { BaseManager } from './BaseManager';
import { Collection } from '@discordjs/collection';
import { IMessage } from '@/types/interfaces/Message';

export class MessagesManager extends BaseManager<IMessage> {
	constructor(client: Client) {
		super(client);
	}

	cache = new Collection<string, IMessage>();
}
