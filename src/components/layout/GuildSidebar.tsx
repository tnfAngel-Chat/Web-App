'use client';

import useThemeColors from '@/hooks/useThemeColors';
import type { RootState } from '@/store';
import { ChannelTypes } from '@/types/enums/ChannelTypes';
import type { GuildBasedChannel } from '@/types/interfaces/Channel';
import type { IGuild } from '@/types/interfaces/Guild';
import { Box, Center, Flex, Icon, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { MdNumbers } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import OverflownText from '../misc/OverflownText';
import ProfileBox from './ProfileBox';

export type GuildChannelLinkProps = {
	guild: IGuild;
	channel: GuildBasedChannel;
	isSelected: boolean;
};

export function GuildChannelLink({ guild, channel, isSelected }: Readonly<GuildChannelLinkProps>) {
	const { getColorValue } = useThemeColors();
	const [_isHovering, setHovering] = useState(false);

	return (
		<Link href={`/guilds/${guild.id}/${channel.id}`}>
			<Flex
				borderRadius='5px'
				bg={isSelected ? getColorValue('sidebarButtonActive') : 'transparent'}
				_hover={{
					bg: isSelected ? getColorValue('sidebarButtonActive') : getColorValue('sidebarButtonHover')
				}}
				padding='5px 5px 5px 5px'
				onMouseEnter={() => setHovering(true)}
				onMouseLeave={() => setHovering(false)}
				gap='1px'
			>
				<Flex h='100%' minH='20px' gap='10px' alignItems='center' minW='0px'>
					<Flex minW='0px' alignItems='center' gap='4px' direction='row'>
						<Center h='100%'>
							<Icon as={MdNumbers} boxSize='20px' color={getColorValue('textMutedColor')} />
						</Center>
						<Box w='100%'>
							<OverflownText
								fontSize='md'
								tooltipPlacement='top'
								fontWeight='600'
								color={isSelected ? getColorValue('textColor') : getColorValue('textMutedColor')}
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

export function GuildSidebarContent({ guild }: Readonly<{ guild: IGuild }>) {
	const selectedState = useSelector((state: RootState) => state.selections);

	const channelsState = useSelector((state: RootState) => state.channels);

	const guildTextChannels = channelsState.channels.filter(
		(channel): channel is GuildBasedChannel => channel.type === ChannelTypes.Text && channel.guildId === guild.id
	);

	return (
		<Stack w='100%' h='100%'>
			{[...guildTextChannels]
				.sort((a, b) => b.position - a.position)
				.map((channel) => {
					return (
						<GuildChannelLink
							guild={guild}
							channel={channel}
							key={channel.id}
							isSelected={selectedState.guilds[guild.id] === channel.id}
						/>
					);
				})}
		</Stack>
	);
}

export default function GuildSidebar({ guild }: { guild: IGuild }) {
	const { getColorValue } = useThemeColors();

	return guild ? (
		<Stack h='100%' minW='250px' maxW='250px' spacing='0px'>
			<Flex
				minH='42px'
				maxH='42px'
				py='10px'
				px='20px'
				bg={getColorValue('ternaryBackground')}
				alignItems='center'
			>
				<OverflownText fontWeight='bold'>{guild.name}</OverflownText>
			</Flex>
			<Box h='100%' w='100%' bg={getColorValue('sidebarBackground')} overflow='auto' padding='10px'>
				<GuildSidebarContent guild={guild} />
			</Box>
			<Box bg={getColorValue('ternaryBackground')}>
				<ProfileBox />
			</Box>
		</Stack>
	) : (
		<></>
	);
}
