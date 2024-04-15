import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';

export interface IRawUser {
	type: UserTypes;
	id: string;
	username: string;
	status: UserStatusTypes;
	avatar?: string | null;
	presence?: string | null;
}

export interface IUser {
	type: UserTypes;
	id: string;
	username: string;
	status: UserStatusTypes;
	avatar: string;
	presence: string | null;
}
