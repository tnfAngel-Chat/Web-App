import { client } from '@/client';
import type { IRawMessage } from '@/types/interfaces/Message';
import useSWRImmutable from 'swr/immutable';

export default function useChannelMessage(channelId: string, messageId: string) {
	const { data, isLoading, error } = useSWRImmutable<IRawMessage[]>(
		`${client.links.api}/channels/${channelId}/messages/${messageId}`
	);

	return { data, isLoading, error };
}
