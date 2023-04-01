export default function normalizeEmojiName(name: string): string {
	return name
		.toLowerCase()
		.replaceAll(',', '')
		.replaceAll(':', '')
		.replaceAll('-', '_')
		.replaceAll(' ', '_');
}
