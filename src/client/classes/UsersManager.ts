import { IUser } from '@/types/interfaces/User';
import { Collection } from '@discordjs/collection';
import { Client } from '..';
import { BaseManager } from './BaseManager';

export class UsersManager extends BaseManager<IUser> {
	constructor(client: Client) {
		super(client);
	}

	cache = new Collection<string, IUser>();
}
