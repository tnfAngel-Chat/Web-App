export class ClientLinks {
	api = process.env['API_URL'] ?? ('https://chat-backend.tnfangel.com/api' as string);
	cdn = process.env['CDN_URL'];
	gateway = process.env['GATEWAY_URL'] ?? ('https://chat-backend.tnfangel.com' as string);
	proxy = process.env['MEDIA_PROXY_URL'];
}
