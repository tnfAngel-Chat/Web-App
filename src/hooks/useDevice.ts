import { useState, useEffect } from 'react';
import { isMobile as isLegitMobile } from 'react-device-detect';

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

export default function useDevice() {
	const [{ width, height }, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const isMobile = isLegitMobile || width <= 1000;

	return { width, height, isMobile };
}
