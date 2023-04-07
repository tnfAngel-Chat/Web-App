import { client } from '@/client';
import {
	Box,
	Center,
	Flex,
	IconButton,
	Spacer,
	useDisclosure,
} from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';
import OverflownText from '../misc/OverflownText';
import SettingsModal from '../modals/SettingsModal';
import StatusIndicator from '../user/StatusIndicator';
import Avatar from '../user/Avatar';

export default function ProfileBox() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const user = client.user;

	return (
		<Box
			w="100%"
			h="100%"
			maxW="100%"
			maxH="100%"
			padding="10px 20px 10px 20px"
		>
			<Flex minW="0px" h="100%" gap="5px">
				<Flex minW="0px" gap="12px" alignItems="left">
					<Center>
						<Avatar
							size="40"
							src={user.avatar}
							alt="Avatar"
							indicator={
								<StatusIndicator
									status={user.status}
									size="15"
								/>
							}
						/>
					</Center>
					<Center w="100%" minW="0px">
						<Box textAlign="left" w="100%" maxW="100%" minW="0px">
							<OverflownText fontSize="md">
								{user.username}
							</OverflownText>
							{user.presence ? (
								<OverflownText fontSize="sm">
									{user.presence}
								</OverflownText>
							) : null}
						</Box>
					</Center>
				</Flex>
				<Spacer />
				<Flex gap="24px">
					<SettingsModal
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
					/>
					<Center>
						<IconButton
							aria-label="Open settings"
							bg="transparent"
							size="sm"
							fontSize="24px"
							onClick={onOpen}
							icon={<MdSettings />}
						/>
					</Center>
				</Flex>
			</Flex>
		</Box>
	);
}
