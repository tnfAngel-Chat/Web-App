import { Client } from '.';
import { io, Socket } from 'socket.io-client';

export class ClientSocket {
	client: Client;
	io: Socket | undefined;
	constructor(client: Client) {
		this.client = client;
	}

	connect() {
		if (typeof window !== undefined)
			this.io = io(this.client.links.gateway, {
				auth: {
					token: 'test.token.123'
				}
			});

		return this.io;
	}
}