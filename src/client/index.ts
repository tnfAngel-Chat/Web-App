import { ClientLinks } from './links';
import { ClientConfig } from './config';
import { ClientSocket } from './socket';
import { UsersManager } from './classes/UsersManager';
import { ChannelsManager } from './classes/ChannelsManager';
import { IRawChannel } from '@/types/interfaces/Channel';
import { IRawUser } from '@/types/interfaces/User';
import normalizeUser from '@/util/normalizeUser';
import normalizeChannel from '@/util/normalizeChannel';

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
		channels,
	}: {
		users: IRawUser[];
		channels: IRawChannel[];
	}) {
		users.forEach((user) =>
			client.users.cache.set(user.id, normalizeUser(user))
		);

		channels.forEach((channel) =>
			client.channels.cache.set(channel.id, normalizeChannel(channel))
		);

		this.user = this.users.resolve('1');
	}
}

export const client = new Client();
