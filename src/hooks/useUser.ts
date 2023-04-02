import useSWRImmutable from 'swr/immutable';
import { IRawUser } from '@/types/interfaces/User';

export default function useUser(userId: string) {
	const { data, isLoading, error } = useSWRImmutable<IRawUser>(
		`http://192.168.1.63:3002/api/users/${userId}`
	);

	return { data, isLoading, error };
}
