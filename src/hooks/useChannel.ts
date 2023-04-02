import useSWRImmutable from 'swr/immutable';
import { IRawChannel } from '@/types/interfaces/Channel';

export default function useChannel(channelId: string) {
	const { data, isLoading, error } = useSWRImmutable<IRawChannel>(
		`http://192.168.1.63:3002/api/channels/${channelId}`
	);

	return { data, isLoading, error };
}
