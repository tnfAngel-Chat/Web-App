import { client } from '@/client';
import type { IRawChannel } from '@/types/interfaces/Channel';
import useSWRImmutable from 'swr/immutable';

export default function useChannel(channelId: string) {
	const { data, isLoading, error } = useSWRImmutable<IRawChannel>(
		client.links.api ? `${client.links.api}/channels/${channelId}` : undefined
	);

	return { data, isLoading, error };
}
