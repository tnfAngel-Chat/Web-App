import { Client } from '..';
import { BaseManager } from './BaseManager';
import { IUser } from '@/types/interfaces/User';
import { Collection } from '@discordjs/collection';
import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';

export class UsersManager extends BaseManager<IUser> {
	constructor(client: Client) {
		super(client);
	}

	cache = new Collection<string, IUser>();

	resolve(id: string) {
		return (
			this.cache.get(id) ?? {
				type: UserTypes.User,
				id: '0',
				username: 'Unknown user',
				status: UserStatusTypes.Offline,
				avatar: 'https://media.discordapp.net/attachments/866159939247931432/1060336031234277407/plink.gif',
				presence: null,
			}
		);
	}
}
