import { IRawMessage } from '@/types/interfaces/Message';
import useSWRImmutable from 'swr/immutable';

export default function useChannelMessages(
	channelId: string,
	before?: string | null,
	after?: string | null
) {
	const url = new URL(
		`http://192.168.1.63:3002/api/channels/${channelId}/messages`
	);

	if (before) url.searchParams.set('before', before);
	if (after) url.searchParams.set('after', after);

	const { data, isLoading, error } = useSWRImmutable<IRawMessage[]>(
		url.toString()
	);

	return { data, isLoading, error };
}