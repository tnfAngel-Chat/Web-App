import { Client } from '.';
import { io, Socket } from 'socket.io-client';

export class ClientSocket {
	client: Client;
	io: Socket | undefined;
	constructor(client: Client) {
		this.client = client;
	}

	connect() {
		if (typeof window !== 'undefined') {
			console.log('Connecting...');

			this.io = io(this.client.links.gateway, {
				path: '/gateway',
				auth: {
					token: '1.token.test',
				},
			});
		}

		return this.io;
	}
}
