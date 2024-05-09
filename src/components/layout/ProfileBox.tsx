import { client } from '@/client';
import { Box, Flex, IconButton, Spacer, useDisclosure } from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';
import OverflownText from '../misc/OverflownText';
import SettingsModal from '../modals/SettingsModal';
import Avatar from '../user/Avatar';
import StatusIndicator from '../user/StatusIndicator';
import useThemeColors from '@/hooks/useThemeColors';

export default function ProfileBox() {
	const { getColorValue } = useThemeColors();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const user = client.user;

	return (
		<Box w='100%' h='100%' maxW='100%' maxH='100%' py={['10px', '15px']} px={['15px', '20px']}>
			<Flex minW='0px' h='100%' gap='5px'>
				<Flex minW='0px' gap='12px' alignItems='left'>
					<Box>
						<Avatar
							size='40'
							src={user.avatar}
							alt='Avatar'
							indicator={<StatusIndicator status={user.status} size='15' />}
						/>
					</Box>
					<Box w='100%' minW='0px'>
						<Flex textAlign='left' w='100%' maxW='100%' minW='0px' gap='0px' direction='column'>
							<OverflownText fontSize='md'>{user.username}</OverflownText>
							{user.presence && (
								<OverflownText fontSize='sm' color={getColorValue('textMutedColor')}>
									{user.presence}
								</OverflownText>
							)}
						</Flex>
					</Box>
				</Flex>
				<Spacer />
				<Flex gap='24px' alignItems='center'>
					<SettingsModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
					<IconButton
						aria-label='Open settings'
						bg='transparent'
						size='sm'
						fontSize='24px'
						onClick={onOpen}
						icon={<MdSettings />}
					/>
				</Flex>
			</Flex>
		</Box>
	);
}
