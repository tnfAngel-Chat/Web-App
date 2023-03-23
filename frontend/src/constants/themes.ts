export interface ThemeColors {
	secondaryContentBackground: string;
	primaryContentBackground: string;
	sideBarButtonActive: string;
	userProfileSidebar: string;
	sidebarButtonHover: string;
	focusBorderColor: string;
	sidebarContent: string;
	separatorColor: string;
	textMutedColor: string;
	messageHover: string;
	tooltipBG: string;
	textColor: string;
}

export interface Theme {
	id: string;
	name: string;
	baseTheme: 'dark' | 'light';
	colors: ThemeColors;
}

export const themes: Theme[] = [
	{
		id: 'dark',
		name: 'Dark',
		baseTheme: 'dark',
		colors: {
			userProfileSidebar: '#252525',
			sidebarContent: '#2E2E2E',
			primaryContentBackground: '#333333',
			secondaryContentBackground: '#3F3F3F',
			focusBorderColor: '#4D4D4D',
			sidebarButtonHover: '#ffffff10',
			sideBarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			separatorColor: '#ffffff20',
			tooltipBG: '#202020',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
		},
	},
	{
		id: 'light',
		name: 'Light',
		baseTheme: 'light',
		colors: {
			userProfileSidebar: '#ffffff',
			sidebarContent: '#F1F1F1',
			primaryContentBackground: '#EBEBEB',
			secondaryContentBackground: '#DADADA',
			focusBorderColor: '#A1A1A1',
			sidebarButtonHover: '#00000010',
			sideBarButtonActive: '#00000020',
			messageHover: '#00000020',
			separatorColor: '#00000020',
			tooltipBG: '#BEBEBE',
			textColor: '#0F0F0F',
			textMutedColor: '#292929',
		},
	},
	{
		id: 'amoled',
		name: 'Amoled',
		baseTheme: 'dark',
		colors: {
			userProfileSidebar: '#080808',
			sidebarContent: '#0C0C0C',
			primaryContentBackground: '#000000',
			secondaryContentBackground: '#181818',
			focusBorderColor: '#242424',
			sidebarButtonHover: '#ffffff10',
			sideBarButtonActive: '#ffffff20',
			messageHover: '#00000020',
			separatorColor: '#ffffff20',
			tooltipBG: '#202020',
			textColor: '#F1F1F1',
			textMutedColor: '#ACACAC',
		},
	},
];
