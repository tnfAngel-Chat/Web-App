import { Client } from '..';
import { BaseManager } from './BaseManager';
import { Collection } from '@discordjs/collection';
import { IChannel } from '@/types/interfaces/Channel';
import { ChannelTypes } from '@/types/enums/ChannelTypes';

export class ChannelsManager extends BaseManager<IChannel> {
	constructor(client: Client) {
		super(client);
	}

	cache = new Collection<string, IChannel>();

	resolve(id: string | null) {
		return (
			(id && this.cache.get(id)) ||
			({
				type: ChannelTypes.DirectMessage,
				id: '0',
				recipient: '0',
			} as IChannel)
		);
	}
}
