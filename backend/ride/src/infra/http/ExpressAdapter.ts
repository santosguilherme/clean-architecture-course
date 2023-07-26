import express, { Request, Response } from "express";
import HttpServer from "./HttpServer";

export default class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](
      url.replace(/\{|\}/g, ""),
      async (req: Request, res: Response) => {
        try {
          const output = await callback(req.params, req.body);
          res.json(output);
        } catch (error: any) {
          res.status(422).send(error.message);
        }
      }
    );
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
