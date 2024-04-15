import useThemeColors from '@/hooks/useThemeColors';
import {
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger
} from '@chakra-ui/react';

export default function CreateGroup({ children }: Readonly<{ children: any }>) {
	const { getColorValue } = useThemeColors();

	return (
		<Popover placement='bottom-start' isLazy>
			<PopoverTrigger>{children}</PopoverTrigger>
			<PopoverContent w={['100vw', 'sm']} backdropFilter='blur(5px)' bg={getColorValue('sidebarBackground')}>
				<PopoverCloseButton />
				<PopoverHeader>Seleccionar amigos para crear un grupo</PopoverHeader>
				<PopoverBody>Aun no hay amigos</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}
