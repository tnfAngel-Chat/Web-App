import { Client } from '.';
import { io, Socket } from 'socket.io-client';

export class ClientSocket {
	client: Client;
	io: Socket | undefined;
	constructor(client: Client) {
		this.client = client;
	}

	connect() {
		this.io = io(this.client.links.gateway, {});

		return this.io;
	}
}
