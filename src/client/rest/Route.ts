export class Route {
	baseEndpoint: string;
	constructor(endpoint: string) {
		this.baseEndpoint = endpoint;
	}

	async request(method: string, endpoint: string, payload?: any) {
		console.log(method, ' ' + endpoint, payload);
		return { id: '1' };
	}

	get(endpoint?: string) {
		return this.request(
			'get',
			this.baseEndpoint + (endpoint ? '' : '/' + endpoint)
		);
	}

	post(endpoint?: string, payload?: any) {
		return this.request(
			'post',
			this.baseEndpoint + (endpoint ? '' : '/' + endpoint),
			payload
		);
	}
}
