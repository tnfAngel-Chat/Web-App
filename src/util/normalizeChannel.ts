import { client } from '@/client';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import type { Channel, IRawChannel } from '@/types/interfaces/Channel';

export default function normalizeChannel(channel: IRawChannel): Channel {
	switch (channel.type) {
		case ChannelTypes.Text:
			return {
				...channel,
				icon: channel.icon ?? 'https://api.dicebear.com/8.x/shapes/svg',
				lastMessage: channel.lastMessage ?? null,
				parentId: channel.parentId ?? null
			};
		case ChannelTypes.DirectMessage:
			return {
				...channel,
				recipient: channel.recipient,
				lastMessage: channel.lastMessage ?? null
			};
		case ChannelTypes.Group:
			const recipients = channel.recipients.map((memberId) => client.users.resolve(memberId));

			return {
				...channel,
				name: channel.name ?? recipients.map((member) => member.username).join(', '),
				icon: channel.icon ?? 'https://api.dicebear.com/8.x/shapes/svg',
				recipients: recipients,
				lastMessage: channel.lastMessage ?? null
			};
	}
}
