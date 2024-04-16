import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';
import type { IUser } from '@/types/interfaces/User';
import { Collection } from '@discordjs/collection';
import { Client } from '..';
import { BaseManager } from './BaseManager';

export class UsersManager extends BaseManager<IUser> {
	constructor(client: Client) {
		super(client);
	}

	override cache = new Collection<string, IUser>();

	resolve(id: string | null) {
		return (
			(id && this.cache.get(id)) || {
				type: UserTypes.User,
				id: '0',
				username: 'Unknown user',
				status: UserStatusTypes.Offline,
				avatar: 'https://api.dicebear.com/8.x/icons/svg?seed=unknown',
				presence: null
			}
		);
	}
}
