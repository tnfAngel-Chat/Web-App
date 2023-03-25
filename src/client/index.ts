import { ClientConfig } from './config';
import { ClientLinks } from './links';
import { ClientSocket } from './socket';

export class Client {
	constructor() {
		console.log('new Client');
	}

	config = new ClientConfig();
	links = new ClientLinks();
	socket = new ClientSocket(this);
}

export const client = new Client();
