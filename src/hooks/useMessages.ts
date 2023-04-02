import { IRawMessage } from '@/types/interfaces/Message';
import useSWRImmutable from 'swr/immutable';

export default function useChannelMessages(channelId: string) {
	const { data, isLoading, error } = useSWRImmutable<IRawMessage[]>(
		`http://192.168.1.63:3002/api/channels/${channelId}/messages`
	);

	return { data, isLoading, error };
}
