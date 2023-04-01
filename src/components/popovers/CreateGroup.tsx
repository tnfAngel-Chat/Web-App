import useThemeColors from '@/hooks/useThemeColors';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverCloseButton,
	PopoverHeader,
	PopoverBody,
} from '@chakra-ui/react';

export default function CreateGroup({ children}: { children: any}) {
	const { getColorValue } = useThemeColors();

	return (
		<Popover placement="bottom-start" isLazy>
			<PopoverTrigger>
				{children}
			</PopoverTrigger>
			<PopoverContent
				w={['100vw', 'sm']}
				backdropFilter="blur(5px)"
				bg={getColorValue('sidebarBackground')}
			>
				<PopoverCloseButton />
				<PopoverHeader>Seleccionar amigos</PopoverHeader>
				<PopoverBody>Aun no hay amigos</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}
