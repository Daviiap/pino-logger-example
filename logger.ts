import pino from "pino";
import formatter from "@elastic/ecs-pino-format";
import { v4 } from "uuid";
import { OpenSearchClient } from "./OpenSearchClient";

const openSearchClient = new OpenSearchClient(process.env.OPENSEARCH_ENDPOINT);

export const pinoLogger = pino(
	{ ...formatter(), name: "pino" },
	{
		write: async (msg: string) => {
			try {
				console.log(JSON.parse(msg));
				await openSearchClient.create({
					index: `api`,
					id: v4(),
					body: JSON.parse(msg),
				});
			} catch (e) {
				console.log("erro");
			}
		},
	}
);

export const logger = pinoLogger.child({ name: "logger" });
