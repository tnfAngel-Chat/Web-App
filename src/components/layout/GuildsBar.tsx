import useThemeColors from '@/hooks/useThemeColors';
import type { RootState } from '@/store';
import type { IGuild } from '@/types/interfaces/Guild';
import { Box, Center, Stack, Tooltip, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdAdd, MdHome } from 'react-icons/md';
import { useSelector } from 'react-redux';
import AddServerModal from '../modals/AddServerModal';

export function IconLink({
	name,
	icon,
	isSelected,
	onClick
}: Readonly<{
	name: string;
	icon: any;
	isSelected?: boolean;
	onClick: any;
}>) {
	const { getColorValue } = useThemeColors();
	return (
		<Box minH='50px' maxH='50px' w='50px' onClick={onClick} cursor='pointer'>
			<Tooltip
				w='100%'
				h='100%'
				label={name}
				placement='start'
				openDelay={10}
				gutter={17}
				bg={getColorValue('tooltipBackground')}
				color={getColorValue('textColor')}
				hasArrow
			>
				<Center
					w='100%'
					h='100%'
					borderRadius='50%'
					bg={getColorValue('iconLinkBackground')}
					outline={`2px solid ${isSelected ? getColorValue('sidebarButtonActive') : 'transparent'}`}
					_hover={{
						bg: getColorValue('sidebarButtonHover'),
						outlineColor: isSelected
							? getColorValue('sidebarButtonActive')
							: getColorValue('sidebarButtonHover')
					}}
				>
					{icon}
				</Center>
			</Tooltip>
		</Box>
	);
}

export function GuildLink({
	guild,
	isSelected
}: Readonly<{
	guild: IGuild;
	isSelected: boolean;
}>) {
	const { getColorValue } = useThemeColors();
	const router = useRouter();
	const selectedState = useSelector((state: RootState) => state.selections);

	const selectedGuildChannel = selectedState.guilds[guild.id];

	return (
		<Box minH='50px' maxH='50px' h='50px' cursor='pointer'>
			<Tooltip
				label={guild.name}
				placement='start'
				openDelay={10}
				gutter={17}
				bg={getColorValue('tooltipBackground')}
				color={getColorValue('textColor')}
				hasArrow
			>
				<Box
					h='100%'
					w='100%'
					borderRadius='50%'
					outline={`4px solid ${isSelected ? getColorValue('sidebarButtonActive') : 'transparent'}`}
					_hover={{
						outlineColor: isSelected
							? getColorValue('sidebarButtonActive')
							: getColorValue('sidebarButtonHover')
					}}
					onClick={() => {
						router.push(`/guilds/${guild.id}${selectedGuildChannel ? `/${selectedGuildChannel}` : ''}`);
					}}
				>
					<Image
						src={guild.icon}
						width={100}
						height={100}
						style={{
							borderRadius: '50%',
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							userSelect: 'none'
						}}
						quality={100}
						alt={guild.name}
						unoptimized
					/>
				</Box>
			</Tooltip>
		</Box>
	);
}

export default function GuildsBar() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { getColorValue } = useThemeColors();
	const router = useRouter();
	const selectedState = useSelector((state: RootState) => state.selections);
	const guildsState = useSelector((state: RootState) => state.guilds);
	const guilds = guildsState.guilds;

	return (
		<Box scrollSnapAlign='start' scrollSnapStop='always' h='100%' minW='70px' maxW='70px'>
			<Stack
				h='100%'
				w='100%'
				spacing='20px'
				bg={getColorValue('guildsBackground')}
				overflow='auto'
				padding='10px'
			>
				<IconLink
					name='Direct Messages'
					icon={<MdHome fontSize='30px' />}
					onClick={() =>
						router.push(
							selectedState.selectedDirectChannel
								? `/channels/${selectedState.selectedDirectChannel}`
								: '/friends'
						)
					}
					isSelected={selectedState.activePage === 'direct'}
				/>
				{guilds.map((guild) => (
					<GuildLink
						key={guild.id}
						guild={guild}
						isSelected={selectedState.activePage === 'guild' && selectedState.selectedGuild === guild.id}
					/>
				))}
				<AddServerModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
				<IconLink name='Add a server' icon={<MdAdd fontSize='30px' />} onClick={onOpen} />
			</Stack>
		</Box>
	);
}
