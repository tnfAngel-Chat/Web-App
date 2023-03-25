import normalizeUser from './normalizeUser';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { IChannel, IRawChannel } from '@/types/interfaces/Channel';

export default function normalizeChannel(
	channel: IRawChannel
): IChannel {
	switch (channel.type) {
		case ChannelTypes.Text:
			return {
				...channel,
				icon:
					channel.icon ??
					'https://cdn.discordapp.com/attachments/865211651492937749/1086976530757996637/IMG-20230318-WA0026.jpg',
			};
		case ChannelTypes.DirectMessage:
			return {
				...channel,
				recipient: normalizeUser(channel.recipient),
			};
		case ChannelTypes.Group:
			const members = channel.members.map(normalizeUser);

			return {
				...channel,
				name:
					channel.name ??
					members.map((member) => member.username).join(', '),
				icon:
					channel.icon ??
					'https://cdn.discordapp.com/attachments/865211651492937749/1086976552123760670/illosandia.png',
				members: members,
			};
	}
}
