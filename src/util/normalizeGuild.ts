import type { IGuild, IRawGuild } from '@/types/interfaces/Guild';

export default function normalizeGuild(guild: IRawGuild): IGuild {
	return {
		...guild,
		icon: guild.icon
			? guild.icon
			: 'https://media.discordapp.net/attachments/866159939247931432/1060336031234277407/plink.gif',
	};
}
