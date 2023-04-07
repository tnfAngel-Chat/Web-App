import { Stack, Box, Tooltip, Center, useDisclosure } from '@chakra-ui/react';
import useThemeColors from '@/hooks/useThemeColors';
import { IGuild } from '@/types/interfaces/Guild';
import Image from 'next/image';
import { MdAdd, MdHome } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import AddServerModal from '../modals/AddServerModal';

export function IconLink({
	name,
	icon,
	onClick,
}: {
	name: string;
	icon: any;
	onClick: any;
}) {
	const { getColorValue } = useThemeColors();
	return (
		<Box minH="50px" maxH="50px" w="50px" onClick={onClick}>
			<Tooltip
				w="100%"
				h="100%"
				label={name}
				placement="start"
				openDelay={10}
				gutter={17}
				bg={getColorValue('tooltipBackground')}
				color={getColorValue('textColor')}
				hasArrow
			>
				<Center
					w="100%"
					h="100%"
					borderRadius="50%"
					_hover={{
						bg: getColorValue('sidebarButtonHover'),
					}}
					bg={getColorValue('iconLinkBackground')}
				>
					{icon}
				</Center>
			</Tooltip>
		</Box>
	);
}

export function GuildLink({
	guild,
	isSelected,
}: {
	guild: IGuild;
	isSelected: boolean;
}) {
	const { getColorValue } = useThemeColors();
	const router = useRouter();
	const selectedState = useSelector((state: RootState) => state.selections);

	const selectedGuildChannel = selectedState.guilds[guild.id];

	return (
		<Box minH="50px" maxH="50px" h="50px">
			<Tooltip
				label={guild.name}
				placement="start"
				openDelay={10}
				gutter={17}
				bg={getColorValue('tooltipBackground')}
				color={getColorValue('textColor')}
				hasArrow
			>
				<Box
					h="100%"
					w="100%"
					borderRadius="50%"
					outline={`5px solid ${
						isSelected
							? getColorValue('sidebarButtonActive')
							: 'transparent'
					}`}
					_hover={{
						outlineColor: isSelected
							? getColorValue('sidebarButtonActive')
							: getColorValue('sidebarButtonHover'),
					}}
					onClick={() => {
						router.push(
							`/guilds/${guild.id}${
								selectedGuildChannel
									? `/${selectedGuildChannel}`
									: ''
							}`
						);
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
							userSelect: 'none',
						}}
						quality={100}
						alt={guild.name}
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
		<Box
			scrollSnapAlign="start"
			scrollSnapStop="always"
			h="100%"
			minW="70px"
			maxW="70px"
		>
			<Stack
				h="100%"
				w="100%"
				spacing="20px"
				bg={getColorValue('guildsBackground')}
				overflow="auto"
				padding="10px"
			>
				<IconLink
					name="Mensajes Directos"
					icon={<MdHome fontSize="30px" />}
					onClick={() =>
						router.push(
							selectedState.selectedDirectChannel
								? `/channels/${selectedState.selectedDirectChannel}`
								: '/friends'
						)
					}
				/>
				{guilds.map((guild) => (
					<GuildLink
						key={guild.id}
						guild={guild}
						isSelected={
							selectedState.activePage === 'guild' &&
							selectedState.selectedGuild === guild.id
						}
					/>
				))}
				<AddServerModal
					isOpen={isOpen}
					onOpen={onOpen}
					onClose={onClose}
				/>
				<IconLink
					name="Añadir un servidor"
					icon={<MdAdd fontSize="30px" />}
					onClick={onOpen}
				/>
			</Stack>
		</Box>
	);
}
