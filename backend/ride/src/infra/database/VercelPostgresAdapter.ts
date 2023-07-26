import DatabaseConnection from "./DatabaseConnection";
import pgp from "pg-promise";

export default class VercelPostgresAdapter implements DatabaseConnection {
  private connection: any;

  constructor() {
    if (!process.env.POSTGRES_URL) {
      throw new Error("process.env.POSTGRES_URL not defined");
    }
    this.connection = pgp()(process.env.POSTGRES_URL + "?sslmode=require");
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}
