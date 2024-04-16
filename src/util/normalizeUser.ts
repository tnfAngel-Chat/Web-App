import type { IRawUser, IUser } from '@/types/interfaces/User';

export default function normalizeUser(user: IRawUser): IUser {
	return {
		...user,
		avatar: user.avatar
			? user.avatar
			: 'https://api.dicebear.com/8.x/identicon/svg?backgroundColor=b6e3f4&seed=' + user.id,
		presence: user.presence ? user.presence : null
	};
}
