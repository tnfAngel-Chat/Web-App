import useSWRImmutable from 'swr/immutable';
import type { IRawChannel } from '@/types/interfaces/Channel';
import { client } from '@/client';

export default function useChannel(channelId: string) {
	const { data, isLoading, error } = useSWRImmutable<IRawChannel>(
		`${client.links.api}/channels/${channelId}`
	);

	return { data, isLoading, error };
}
