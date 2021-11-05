import pino from "pino";
import pinoHttp from "pino-http";
import { v4 } from "uuid";

import { Response, Request } from "express";

import { pinoLogger } from "./logger";

export const httpLogger = pinoHttp({
	logger: pinoLogger.child({ name: "http" }),
	genReqId: function () {
		return v4();
	},
	serializers: {
		err: pino.stdSerializers.err,
		req: pino.stdSerializers.req,
		res: pino.stdSerializers.res,
	},
	wrapSerializers: true,
	customLogLevel: function (res: Response, err: Error) {
		let logType = "info";

		if (res.statusCode >= 400 && res.statusCode < 500) {
			logType = "warn";
		} else if (res.statusCode >= 500 || err) {
			logType = "error";
		}

		return logType;
	},
	customSuccessMessage: function (res: Response) {
		let message = "Request completed";

		if (res.statusCode === 404) {
			message = "Resource not found";
		}

		return message;
	},
	customErrorMessage: function (_: Request, res: Response) {
		return "Request errored with status code: " + res.statusCode;
	},
	customAttributeKeys: {
		req: "request",
		res: "response",
		err: "error",
	},
	customProps: function (req: Request, res: Response) {
		return {
			body: req.body,
		};
	},
});
