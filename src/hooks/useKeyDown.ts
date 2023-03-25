import { useEffect } from 'react';

export const useKeyDown = (callback: any, keys: string[]) => {
	useEffect(() => {
		const onKeyDown = (event: any) => {
			const wasAnyKeyPressed = keys.some((key) => event.key === key);
			if (wasAnyKeyPressed) {
				event.preventDefault();
				callback();
			}
		};

		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [callback, keys]);
};
