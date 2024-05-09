'use client';

import useDevice from '@/hooks/useDevice';
import useThemeColors from '@/hooks/useThemeColors';
import { Center, Flex, Icon, IconButton, Spacer } from '@chakra-ui/react';
import { useState } from 'react';
import { MdAdd, MdMenu, MdPeople, MdSearch } from 'react-icons/md';
import OverflownText from '../misc/OverflownText';

export default function FriendsTopBarContent({
	friendsFlexRef,
	friendsRef
}: Readonly<{
	friendsFlexRef: any;
	friendsRef: any;
}>) {
	const { getColorValue } = useThemeColors();
	const { isMobile } = useDevice();
	const [mobileShowSidebar, setMobileShowSidebar] = useState(true);

	return (
		<>
			<Flex gap='8px' h='100%' minW='30px' maxH='100%' alignItems='center'>
				{isMobile && (
					<IconButton
						aria-label='Show menu'
						bg='transparent'
						size='sm'
						fontSize='24px'
						icon={<MdMenu />}
						onClick={() => {
							if (mobileShowSidebar) {
								friendsFlexRef.current?.scrollIntoView({
									behavior: 'smooth'
								});
								setMobileShowSidebar(false);
							} else {
								friendsRef.current?.scrollIntoView({
									behavior: 'smooth'
								});
								setMobileShowSidebar(true);
							}
						}}
					/>
				)}
				<Flex gap='3px' alignItems='center' minW='0px'>
					<Icon color={getColorValue('textMutedColor')} as={MdPeople} boxSize='24px' />

					<OverflownText fontSize='lg' fontWeight='600'>
						Friends
					</OverflownText>
				</Flex>

				<OverflownText fontSize='sm' color={getColorValue('textMutedColor')}>
					20
				</OverflownText>
			</Flex>
			<Spacer />
			<Flex gap={['5px', '10px', '24px']} alignItems='center'>
				<IconButton aria-label='Search Friend' bg='transparent' size='sm' fontSize='24px' icon={<MdSearch />} />
				<IconButton aria-label='Add Friend' bg='transparent' size='sm' fontSize='24px' icon={<MdAdd />} />
			</Flex>
		</>
	);
}
