import HttpServer from "./HttpServer";
import Hapi from "@hapi/hapi";

export default class HapiAdapter implements HttpServer {
  server: Hapi.Server;

  constructor() {
    this.server = Hapi.server({});
  }

  on(method: string, url: string, callback: Function): void {
    this.server.route({
      method,
      path: url.replace(/\:/g, ""),
      handler: async (req: any, reply: any) => {
        try {
          const output = await callback(req.params, req.payload);
          return output;
        } catch (error: any) {
          return reply.response(error.message).code(422);
        }
      },
    });
  }

  listen(port: number): void {
    this.server.settings.port = port;
    this.server.start();
  }
}
