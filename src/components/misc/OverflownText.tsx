import useThemeColors from '@/hooks/useThemeColors';
import { Tooltip, Box, type PlacementWithLogical } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';

export default function OverflownText({
	children,
	tooltipPlacement,
	...props
}: Readonly<{
	children: any;
	tooltipPlacement?: PlacementWithLogical;
	[props: string]: any;
}>) {
	const ref = useRef<any>(null);
	const [isOverflown, setIsOverflown] = useState(false);
	const { getColorValue } = useThemeColors();

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
			bg={getColorValue('tooltipBackground')}
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
