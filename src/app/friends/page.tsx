'use client';

import FriendsScreen from '@/components/screens/FriendsScreen';
import {
	setActivePage,
} from '@/store/slices/selectionsSlice';
import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

export default function FriendsPage() {
	const dispatch = useDispatch();

	dispatch(setActivePage('direct'));

	return (
		<Flex h="100%" w="100%">
			<FriendsScreen />
		</Flex>
	);
}
