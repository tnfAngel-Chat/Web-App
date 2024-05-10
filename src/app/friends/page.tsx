'use client';

import FriendsScreen from '@/components/screens/FriendsScreen';
import { setActivePage } from '@/store/slices/selectionsSlice';
import { useDispatch } from 'react-redux';

export default function FriendsPage() {
	const dispatch = useDispatch();

	dispatch(setActivePage('direct'));

	return <FriendsScreen />;
}
