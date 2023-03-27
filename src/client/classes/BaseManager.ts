import { Client } from '..';
import { Collection } from '@discordjs/collection';

export class BaseManager<CollectionKeyType extends { id: string }> {
	client: Client;
	cache: Collection<string, CollectionKeyType>;

	constructor(client: Client) {
		this.client = client;

		this.cache = new Collection<string, CollectionKeyType>();
	}

	add(data: CollectionKeyType, cache = true) {
		const existing = this.cache.get(data.id);

		if (existing) return existing;

		if (cache) this.cache.set(data.id, data);

		return data;
	}

	async fetch(id: string, cache = true, force = false) {
		if (!force) {
			const existing = this.cache.get(id);

			if (existing) return existing;
		}

		const data = await this.client.rest.api.channels.get(id);

		if (data) {
			this.add(data as CollectionKeyType, cache);
		}

		return data;
	}
}
