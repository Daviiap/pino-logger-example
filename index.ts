import express from "express";
import { json, Request, Response } from "express";
import { httpLogger } from "./logger-middleware";

const server = express();

server.use(json());
server.use(httpLogger);

server.get("/", async (req: Request, res: Response) => {
	return res.status(200).json({ status: "running", time: new Date() });
});

server.post("/", async (req: Request, res: Response) => {
	return res.status(200).json({ status: "running", time: new Date() });
});

server.listen(3000);
