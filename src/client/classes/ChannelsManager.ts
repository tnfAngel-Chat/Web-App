import { IChannel } from '@/types/interfaces/Channel';
import { Collection } from '@discordjs/collection';
import { Client } from '..';
import { BaseManager } from './BaseManager';

export class ChannelsManager extends BaseManager<IChannel> {
	constructor(client: Client) {
		super(client);
	}

	cache = new Collection<string, IChannel>();
}
