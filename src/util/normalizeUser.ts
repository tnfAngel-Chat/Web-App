import type { IRawUser, IUser } from '@/types/interfaces/User';

export default function normalizeUser(user: IRawUser): IUser {
	return {
		...user,
		avatar: user.avatar
			? user.avatar
			: 'https://media.discordapp.net/attachments/866159939247931432/1060336031234277407/plink.gif',
		presence: user.presence ? user.presence : null
	};
}
