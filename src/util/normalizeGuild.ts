import type { IGuild, IRawGuild } from '@/types/interfaces/Guild';

export default function normalizeGuild(guild: IRawGuild): IGuild {
	return {
		...guild,
		icon: guild.icon ? guild.icon : 'https://api.dicebear.com/8.x/shapes/svg?seed=' + guild.id
	};
}
