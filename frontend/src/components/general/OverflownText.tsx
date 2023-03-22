import useColorValue from '@/hooks/useColorValue';
import { Tooltip, Box } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';

export default function OverflownText({
	children,
	tooltipPlacement,
	...props
}: any) {
	const ref = useRef<HTMLElement | null>(null);
	const [isOverflown, setIsOverflown] = useState(false);
	const { getColorValue } = useColorValue();

	function updateOverflow() {
		if (ref.current)
			setIsOverflown(
				ref?.current?.scrollWidth > ref?.current?.clientWidth
			);
	}

	useEffect(() => {
		if (ref.current)
			setIsOverflown(
				ref?.current?.scrollWidth > ref?.current?.clientWidth
			);
	}, []);

	return (
		<Tooltip
			label={children}
			isDisabled={!isOverflown}
			placement={tooltipPlacement ?? 'bottom'}
			openDelay={300}
			bg={getColorValue('tooltipBG')}
			color={getColorValue('textColor')}
			hasArrow
		>
			<Box
				position="relative"
				onMouseOver={updateOverflow}
				isTruncated
				ref={ref}
				{...props}
			>
				{children}
			</Box>
		</Tooltip>
	);
}
