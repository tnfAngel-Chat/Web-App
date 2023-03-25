import useThemeColors from '@/hooks/useThemeColors';
import { IUser } from '@/types/interfaces/User';
import {
	ModalOverlay,
	ModalContent,
	ModalBody,
	Stack,
	Modal,
	Box,
	Center,
	Flex,
	Card,
	CardBody,
	CardHeader,
	Heading,
	Text,
} from '@chakra-ui/react';
import OverflownText from '../general/OverflownText';
import Avatar from '../user/Avatar';
import StatusIndicator from '../user/StatusIndicator';

export default function UserProfileModal({
	isOpen,
	onClose,
	user,
}: {
	isOpen: boolean;
	onOpen: any;
	onClose: any;
	user?: IUser;
}) {
	const { getColorValue } = useThemeColors();

	if (!user) return <></>;

	return (
		<Modal isOpen={isOpen} size="lg" onClose={onClose} isCentered>
			<ModalOverlay backdropFilter="blur(5px)" />
			<ModalContent
				color={getColorValue('textColor')}
				bg={getColorValue('sidebarContent')}
			>
				<ModalBody padding="15px">
					<Stack h="100%">
						<Flex
							padding="0px 0px 20px 0px"
							h="100%"
							flex="1"
							gap="15px"
							alignItems="center"
						>
							<Center>
								<Avatar
									size="64"
									src={user.avatar}
									alt="Avatar"
									indicator={
										<StatusIndicator
											status={user.status}
											size="22"
										/>
									}
								/>
							</Center>
							<Center>
								<Box textAlign="left">
									<OverflownText
										fontSize="xl"
										tooltipPlacement="top"
									>
										@{user.username}
									</OverflownText>
									{user.presence ? (
										<OverflownText
											fontSize="sm"
											tooltipPlacement="top"
										>
											{user.presence}
										</OverflownText>
									) : null}
								</Box>
							</Center>
						</Flex>
						<Card h="100%" bg={getColorValue('userProfileSidebar')}>
							<CardHeader>
								<Heading size="md">About me</Heading>
							</CardHeader>

							<CardBody minH="150px">
								<Text pt="2" fontSize="sm">
									que pasa bobolon
								</Text>
							</CardBody>
						</Card>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
