import useSWRImmutable from 'swr/immutable';
import { IRawUser } from '@/types/interfaces/User';
import { client } from '@/client';

export default function useUser(userId: string) {
	const { data, isLoading, error } = useSWRImmutable<IRawUser>(
		`${client.links.api}/api/users/${userId}`
	);

	return { data, isLoading, error };
}
