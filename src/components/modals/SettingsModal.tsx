import useTheme from '@/hooks/useTheme';
import useThemeColors from '@/hooks/useThemeColors';
import {
	ModalCloseButton,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	Switch,
	Stack,
	Modal,
	Text,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function SettingsModal({ isOpen, onClose }: any) {
	const { getColorValue } = useThemeColors();
	const [theme, setTheme, themes] = useTheme();

	return (
		<Modal isOpen={isOpen} size="full" onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				color={getColorValue('textColor')}
				bg={getColorValue('sidebarContent')}
			>
				<ModalHeader>Ajustes de usuario</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack>
						<Text>Tema</Text>
						<Menu>
							<MenuButton
								w="150px"
								as={Button}
								rightIcon={<MdKeyboardArrowDown />}
							>
								{theme.name}
							</MenuButton>
							<MenuList bg={getColorValue('sidebarContent')}>
								{themes.map((theme) => (
									<MenuItem
										bg={getColorValue('sidebarContent')}
										_hover={{
											bg: getColorValue(
												'userProfileSidebar'
											),
										}}
										onClick={() => setTheme(theme.id)}
										key={theme.id}
									>
										{theme.name}
									</MenuItem>
								))}
							</MenuList>
						</Menu>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
