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
			<ModalOverlay backdropFilter="blur(5px)" />
			<ModalContent
				color={getColorValue('textColor')}
				bg={getColorValue('modalBackground')}
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
							<MenuList bg={getColorValue('modalBackground')}>
								{themes.map((theme) => (
									<MenuItem
										bg={getColorValue('modalBackground')}
										_hover={{
											bg: getColorValue(
												'ternaryBackground'
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
