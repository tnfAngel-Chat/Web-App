'use client';

import { Flex, Box, Stack, Icon, Center } from '@chakra-ui/react';
import { MdAdd, MdHome, MdNumbers } from 'react-icons/md';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import { Channel, GuildBasedChannel } from '@/types/interfaces/Channel';
import { RootState } from '@/store';
import { useState } from 'react';
import { removeChannel } from '@/store/slices/channelsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Avatar from '../user/Avatar';
import Separator from './Separator';
import StatusIndicator from '../user/StatusIndicator';
import OverflownText from '../misc/OverflownText';
import useThemeColors from '@/hooks/useThemeColors';
import { client } from '@/client';
import CreateGroup from '../popovers/CreateGroup';
import ProfileBox from './ProfileBox';
import { IGuild } from '@/types/interfaces/Guild';

export type GuildChannelLinkProps = {
	guild: IGuild;
	channel: GuildBasedChannel;
	isSelected: boolean;
};

export function GuildChannelLink({
	guild,
	channel,
	isSelected,
}: GuildChannelLinkProps) {
	const dispatch = useDispatch();
	const { getColorValue } = useThemeColors();
	const [isHovering, setHovering] = useState(false);

	return (
		<Link href={`/guilds/${guild.id}/${channel.id}`}>
			<Flex
				borderRadius="5px"
				bg={
					isSelected
						? getColorValue('sidebarButtonActive')
						: 'transparent'
				}
				_hover={{
					bg: isSelected
						? getColorValue('sidebarButtonActive')
						: getColorValue('sidebarButtonHover'),
				}}
				padding="5px 5px 5px 5px"
				onMouseEnter={() => setHovering(true)}
				onMouseLeave={() => setHovering(false)}
				gap="1px"
			>
				<Flex
					h="100%"
					minH="20px"
					gap="10px"
					alignItems="center"
					minW="0px"
				>
					<Flex
						minW="0px"
						alignItems="center"
						gap="4px"
						direction="row"
					>
						<Center h="100%">
							<Icon
								as={MdNumbers}
								boxSize="20px"
								color={getColorValue('textMutedColor')}
							/>
						</Center>
						<Box w="100%">
							<OverflownText
								fontSize="md"
								tooltipPlacement="top"
								className={isSelected ? 'text-bold' : ''}
							>
								{channel.name}
							</OverflownText>
						</Box>
					</Flex>
				</Flex>
			</Flex>
		</Link>
	);
}

export function GuildSidebarContent({ guild }: { guild: IGuild }) {
	const selectedState = useSelector((state: RootState) => state.selections);

	const channelsState = useSelector((state: RootState) => state.channels);

	const guildTextChannels = channelsState.channels.filter(
		(channel): channel is GuildBasedChannel =>
			channel.type === ChannelTypes.Text && channel.guildId === guild.id
	);

	return (
		<Stack w="100%" h="100%">
			{[...guildTextChannels]
				.sort(
					(a, b) =>
						parseInt(b.lastMessage ?? '0') -
						parseInt(a.lastMessage ?? '0')
				)
				.map((channel) => {
					return (
						<GuildChannelLink
							guild={guild}
							channel={channel}
							key={channel.id}
							isSelected={
								selectedState.guilds[guild.id] === channel.id
							}
						/>
					);
				})}
		</Stack>
	);
}

export default function GuildSidebar({
	guild,
}: {
	guild: IGuild;
}) {
	const { getColorValue } = useThemeColors();

	return guild ? (
		<Stack h="100%" minW="250px" maxW="250px" spacing="0px">
			<Flex
				minH="42px"
				maxH="42px"
				padding="5px 20px 5px 20px"
				bg={getColorValue('ternaryBackground')}
				alignItems="center"
			>
				<OverflownText>{guild.name}</OverflownText>
			</Flex>
			<Box
				h="100%"
				w="100%"
				bg={getColorValue('sidebarBackground')}
				overflow="auto"
				padding="10px"
			>
				<GuildSidebarContent guild={guild} />
			</Box>
			<Box minH="75px" bg={getColorValue('ternaryBackground')}>
				<ProfileBox />
			</Box>
		</Stack>
	) : (
		<></>
	);
}
