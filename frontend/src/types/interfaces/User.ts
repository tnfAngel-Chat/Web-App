import { UserStatusTypes } from '@/types/enums/UserStatusTypes';
import { UserTypes } from '@/types/enums/UserTypes';

export interface IUser {
	type: UserTypes;
	id: string;
	username: string;
	status: UserStatusTypes;
	avatarId?: string;
	presence?: string;
}
