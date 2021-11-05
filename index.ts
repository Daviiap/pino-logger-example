import express from "express";
import { json, Request, Response } from "express";
import { httpLogger } from "./logger-middleware";
import { logger } from "./logger";
import { OpenSearchClient } from "./OpenSearchClient";

const server = express();

server.use(json());
server.use(httpLogger);

server.get("/", async (req: Request, res: Response) => {
	logger.warn("cuidado viu");
	return res.status(200).json({ status: "running", time: new Date() });
});

server.post("/", async (req: Request, res: Response) => {
	{
		const esClient = new OpenSearchClient(
			"https://search-nuvidio-hml-uf6lqbr2g3ji2x32jzaeckf4ge.us-east-1.es.amazonaws.com"
		);

		const { query, index } = req.body;

		const { data } = await esClient.get({ index, query });

		return res.status(200).json({ status: "running", time: new Date(), data });
	}
});

server.listen(3000);
