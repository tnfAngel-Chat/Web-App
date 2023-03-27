import { ClientConfig } from './config';
import { ClientLinks } from './links';
import { ClientSocket } from './socket';
import { UsersManager } from './classes/UsersManager';
import { ChannelsManager } from './classes/ChannelsManager';
import { MessagesManager } from './classes/MessagesManager';
import { RestClient } from './rest/client';

export class Client {
	constructor() {
		console.log('new Client');
	}

	config = new ClientConfig();
	links = new ClientLinks();
	socket = new ClientSocket(this);

	rest = new RestClient();

	users = new UsersManager(this);
	channels = new ChannelsManager(this);
	Messages = new MessagesManager(this);
}

export const client = new Client();
