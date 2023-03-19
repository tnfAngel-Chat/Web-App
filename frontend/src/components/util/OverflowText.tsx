import useColorValue from '@/hooks/useColorValue';
import { Tooltip, Box } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';

export default function OverflownText({ children, ...props }: any) {
	const ref = useRef(null);
	const [isOverflown, setIsOverflown] = useState(false);
	const { getColorValue } = useColorValue();

	useEffect(() => {
		const element: HTMLElement = ref.current!;
		setIsOverflown(element.scrollWidth > element.clientWidth);
	}, []);

	return (
		<Tooltip
			label={children}
			isDisabled={!isOverflown}
			placement={props.tooltipPlacement ?? 'bottom'}
			openDelay={500}
			bg={getColorValue('tooltipBG')}
			color={getColorValue('textColor')}
			hasArrow
		>
			<Box position="relative" isTruncated ref={ref} {...props}>
				{children}
			</Box>
		</Tooltip>
	);
}
