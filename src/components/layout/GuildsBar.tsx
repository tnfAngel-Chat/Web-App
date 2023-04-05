import useThemeColors from '@/hooks/useThemeColors';
import { GuildTypes } from '@/types/enums/GuildTypes';
import { IGuild } from '@/types/interfaces/Guild';
import normalizeGuild from '@/util/normalizeGuild';
import { Stack, Box, Tooltip, Center } from '@chakra-ui/react';
import Image from 'next/image';
import { MdAdd, MdHome } from 'react-icons/md';

const guilds: IGuild[] = [
	{
		type: GuildTypes.Common,
		id: '12',
		name: 'El pepe',
		description: 'que pasa',
		createdAt: 12313,
		owner: '0',
	},
	{
		type: GuildTypes.Common,
		id: '13',
		name: 'Juan',
		description: 'que pasa',
		createdAt: 12313,
		owner: '0',
	},
	{
		type: GuildTypes.Common,
		id: '15',
		name: 'Ete sech',
		description: 'que pasa',
		createdAt: 12313,
		owner: '0',
	},
	{
		type: GuildTypes.Common,
		id: '16',
		name: 'El setch',
		description: 'que pasa',
		createdAt: 12313,
		owner: '0',
	},
].map(normalizeGuild);

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
		<Box minH="50px" maxH="50px" w="50px">
			<Tooltip
				w="100%"
				h="100%"
				label={name}
				placement="start"
				openDelay={10}
				bg={getColorValue('tooltipBackground')}
				color={getColorValue('textColor')}
				hasArrow
			>
				<Center
					w="100%"
					h="100%"
					borderRadius="50%"
					bg={getColorValue('iconLinkBackground')}
				>
					{icon}
				</Center>
			</Tooltip>
		</Box>
	);
}

export function GuildLink({ guild }: { guild: IGuild }) {
	const { getColorValue } = useThemeColors();
	return (
		<Box minH="50px" maxH="50px" h="50px">
			<Tooltip
				label={guild.name}
				placement="start"
				openDelay={10}
				bg={getColorValue('tooltipBackground')}
				color={getColorValue('textColor')}
				hasArrow
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
			</Tooltip>
		</Box>
	);
}

export default function GuildsBar({
	selectedGuildID,
}: {
	selectedGuildID?: string;
}) {
	const { getColorValue } = useThemeColors();

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
					onClick={() => null}
				/>
				{guilds.map((guild) => (
					<GuildLink key={guild.id} guild={guild} />
				))}
				<IconLink
					name="Añadir un servidor"
					icon={<MdAdd fontSize="30px" />}
					onClick={() => null}
				/>
			</Stack>
		</Box>
	);
}
