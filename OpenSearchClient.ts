import axios, { Axios } from "axios";

export class OpenSearchClient {
	private httpClient: Axios;

	public constructor(endpoint: string) {
		this.httpClient = axios.create({
			baseURL: endpoint,
		});
	}

	public async create(props: { index: string; id: string; body: string }) {
		try {
			const { index, id, body } = props;
			await this.httpClient.post(`/${index}/_doc/${id}`, body);
		} catch (error) {
			console.log(error);
		}
	}

	public async get(props: { index: string; query: string }) {
		try {
			const { index, query } = props;
			return await this.httpClient.get(`/${index}/_search?q=${query}`);
		} catch (error) {
			console.log(error);
		}
	}
}
