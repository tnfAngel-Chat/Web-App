import useTheme from '@/hooks/useTheme';
import useThemeColors from '@/hooks/useThemeColors';
import {
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Switch,
	Text
} from '@chakra-ui/react';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function SettingsModal({ isOpen, onClose }: any) {
	const { getColorValue } = useThemeColors();
	const [theme, setTheme, themes] = useTheme();

	return (
		<Modal isOpen={isOpen} size='full' onClose={onClose}>
			<ModalOverlay backdropFilter='blur(5px)' />
			<ModalContent color={getColorValue('textColor')} bg={getColorValue('modalBackground')}>
				<ModalHeader>User settings</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack>
						<Text>Theme</Text>
						<Menu>
							<MenuButton w='150px' as={Button} rightIcon={<MdKeyboardArrowDown />}>
								{theme?.name ?? 'Unknown theme'}
							</MenuButton>
							<MenuList bg={getColorValue('modalBackground')}>
								{themes.map((theme) => (
									<MenuItem
										bg='transparent'
										_hover={{
											bg: getColorValue('ternaryBackground')
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
