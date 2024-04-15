import type { IRawChannel } from '@/types/interfaces/Channel';
import type { IRawUser } from '@/types/interfaces/User';
import normalizeChannel from '@/util/normalizeChannel';
import normalizeUser from '@/util/normalizeUser';
import { ChannelsManager } from './classes/ChannelsManager';
import { UsersManager } from './classes/UsersManager';
import { ClientConfig } from './config';
import { ClientLinks } from './links';
import { ClientSocket } from './socket';

export class Client {
	config = new ClientConfig();
	links = new ClientLinks();
	socket = new ClientSocket(this);

	users = new UsersManager(this);
	user = this.users.resolve(null);
	channels = new ChannelsManager(this);
	sentMessagesIds: string[] = [];

	populate({
		users,
		channels
	}: {
		users: IRawUser[];
		channels: IRawChannel[];
	}) {
		users.forEach((user) => client.users.cache.set(user.id, normalizeUser(user)));

		channels.forEach((channel) => client.channels.cache.set(channel.id, normalizeChannel(channel)));

		this.user = this.users.resolve('1');
	}
}

export const client = new Client();
