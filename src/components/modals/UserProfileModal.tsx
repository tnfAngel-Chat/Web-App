import useThemeColors from '@/hooks/useThemeColors';
import type { IUser } from '@/types/interfaces/User';
import {
	Box,
	Card,
	CardBody,
	CardHeader,
	Center,
	Flex,
	Heading,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Stack,
	Text
} from '@chakra-ui/react';
import OverflownText from '../misc/OverflownText';
import Avatar from '../user/Avatar';
import StatusIndicator from '../user/StatusIndicator';

export default function UserProfileModal({
	isOpen,
	onClose,
	user
}: Readonly<{
	isOpen: boolean;
	onClose: any;
	user?: IUser;
}>) {
	const { getColorValue } = useThemeColors();

	if (!user) return <></>;

	return (
		<Modal isOpen={isOpen} size='lg' onClose={onClose} isCentered>
			<ModalOverlay backdropFilter='blur(5px)' />
			<ModalContent color={getColorValue('textColor')} bg={getColorValue('modalBackground')}>
				<ModalBody padding='15px'>
					<Stack h='100%'>
						<Flex padding='0px 0px 20px 0px' h='100%' flex='1' gap='15px' alignItems='center'>
							<Center>
								<Avatar
									size='64'
									src={user.avatar}
									alt='Avatar'
									indicator={<StatusIndicator status={user.status} size='22' />}
								/>
							</Center>
							<Center>
								<Box textAlign='left'>
									<OverflownText fontSize='xl' tooltipPlacement='top'>
										@{user.username}
									</OverflownText>
									{user.presence ? (
										<OverflownText fontSize='sm' tooltipPlacement='top'>
											{user.presence}
										</OverflownText>
									) : null}
								</Box>
							</Center>
						</Flex>
						<Card h='100%' bg={getColorValue('ternaryBackground')}>
							<CardHeader pb='4px'>
								<Heading size='md'>About me</Heading>
							</CardHeader>
							<CardBody minH='150px' pt='2px'>
								<Text fontSize='sm'>que pasa bobolon</Text>
							</CardBody>
						</Card>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
