import { ClientLinks } from './links';
import { ClientConfig } from './config';
import { ClientSocket } from './socket';
import { RestClient } from './rest/client';
import { UsersManager } from './classes/UsersManager';
import { ChannelsManager } from './classes/ChannelsManager';
import { MessagesManager } from './classes/MessagesManager';
import { IRawChannel } from '@/types/interfaces/Channel';
import { IRawUser } from '@/types/interfaces/User';
import normalizeUser from '@/util/normalizeUser';
import normalizeChannel from '@/util/normalizeChannel';

export class Client {
	constructor() {
		console.log('new Client');
	}

	config = new ClientConfig();
	links = new ClientLinks();
	socket = new ClientSocket(this);

	rest = new RestClient();

	users = new UsersManager(this);
	user = this.users.resolve(null)
	channels = new ChannelsManager(this);
	Messages = new MessagesManager(this);

	populate({ users, channels }: {
		users: IRawUser[];
		channels: IRawChannel[];
	}) {
		users.forEach((user) =>
			client.users.cache.set(user.id, normalizeUser(user))
		);

		channels.forEach((channel) =>
			client.channels.cache.set(channel.id, normalizeChannel(channel))
		);

		this.user = this.users.resolve('1')
	}
}

export const client = new Client();
