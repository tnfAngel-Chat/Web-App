import { client } from '@/client';
import type { IRawUser } from '@/types/interfaces/User';
import useSWRImmutable from 'swr/immutable';

export default function useUser(userId: string) {
	const { data, isLoading, error } = useSWRImmutable<IRawUser>(
		client.links.api ? `${client.links.api}/api/users/${userId}` : undefined
	);

	return { data, isLoading, error };
}
