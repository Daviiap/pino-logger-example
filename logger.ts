import pino from "pino";
import formatter from "@elastic/ecs-pino-format";
import { v4 } from "uuid";
import { OpenSearchClient } from "./OpenSearchClient";

const openSearchClient = new OpenSearchClient(
	"https://search-nuvidio-hml-uf6lqbr2g3ji2x32jzaeckf4ge.us-east-1.es.amazonaws.com"
);

export const pinoLogger = pino(
	{ ...formatter(), name: "pino" },
	{
		write: async (msg: string) => {
			try {
				console.log(JSON.parse(msg));
				openSearchClient.create({
					index: `api`,
					id: v4(),
					body: JSON.parse(msg),
				});
			} catch (e) {
				console.log(e);
			}
		},
	}
);

export const logger = pinoLogger.child({ name: "logger" });
