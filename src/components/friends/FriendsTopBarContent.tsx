'use client';

import useThemeColors from '@/hooks/useThemeColors';
import { Center, Flex, Icon, IconButton, Spacer } from '@chakra-ui/react';
import { MdAdd, MdMenu, MdPeople, MdSearch } from 'react-icons/md';
import OverflownText from '../misc/OverflownText';
import useDevice from '@/hooks/useDevice';
import { useState } from 'react';

export default function FriendsTopBarContent({
	friendsFlexRef,
	friendsRef,
}: {
	friendsFlexRef: any;
	friendsRef: any;
}) {
	const { getColorValue } = useThemeColors();
	const { isMobile } = useDevice();
	const [mobileShowSidebar, setMobileShowSidebar] = useState(true);

	return (
		<>
			<Flex gap="8px" h="100%" minW="30px" maxH="100%">
				{isMobile && (
					<Center>
						<IconButton
							aria-label="Show menu"
							bg="transparent"
							size="sm"
							fontSize="24px"
							icon={<MdMenu />}
							onClick={() => {
								if (mobileShowSidebar) {
									friendsFlexRef.current?.scrollIntoView({
										behavior: 'smooth',
									});
									setMobileShowSidebar(false);
								} else {
									friendsRef.current?.scrollIntoView({
										behavior: 'smooth',
									});
									setMobileShowSidebar(true);
								}
							}}
						/>
					</Center>
				)}
				<Center>
					<Icon
						color={getColorValue('textMutedColor')}
						as={MdPeople}
						boxSize="24px"
					/>
				</Center>
				<Center minW="0px">
					<OverflownText fontSize="lg">Amigos</OverflownText>
				</Center>
				<Center minW="0px">
					<OverflownText
						fontSize="sm"
						color={getColorValue('textMutedColor')}
					>
						20
					</OverflownText>
				</Center>
			</Flex>
			<Spacer />
			<Flex gap="24px">
				<Center>
					<IconButton
						aria-label="Search Friend"
						bg="transparent"
						size="sm"
						fontSize="24px"
						icon={<MdSearch />}
					/>
				</Center>
				<Center>
					<IconButton
						aria-label="Add Friend"
						bg="transparent"
						size="sm"
						fontSize="24px"
						icon={<MdAdd />}
					/>
				</Center>
			</Flex>
		</>
	);
}
