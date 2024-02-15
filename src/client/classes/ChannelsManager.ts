import { Client } from '..';
import { BaseManager } from './BaseManager';
import { Collection } from '@discordjs/collection';
import type { Channel } from '@/types/interfaces/Channel';
import { ChannelTypes } from '@/types/enums/ChannelTypes';

export class ChannelsManager extends BaseManager<Channel> {
	constructor(client: Client) {
		super(client);
	}

	override cache = new Collection<string, Channel>();

	resolve(id: string | null) {
		return (
			(id && this.cache.get(id)) ||
			({
				type: ChannelTypes.DirectMessage,
				id: '0',
				recipient: '0',
			} as Channel)
		);
	}
}
