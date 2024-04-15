import { ChannelTypes } from '@/types/enums/ChannelTypes';
import type { Channel } from '@/types/interfaces/Channel';
import { Collection } from '@discordjs/collection';
import { Client } from '..';
import { BaseManager } from './BaseManager';

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
				recipient: '0'
			} as Channel)
		);
	}
}
