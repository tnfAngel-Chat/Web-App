import { Client } from '..';
import { BaseManager } from './BaseManager';
import { Collection } from '@discordjs/collection';
import { IChannel } from '@/types/interfaces/Channel';

export class ChannelsManager extends BaseManager<IChannel> {
	constructor(client: Client) {
		super(client);
	}

	cache = new Collection<string, IChannel>();
}
