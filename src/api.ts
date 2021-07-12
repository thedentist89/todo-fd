import { Catalog, WakandaClient } from "wakanda-client";

export default class Client {
  static instance: Client;
  client: WakandaClient;
  readonly catalog: Promise<Catalog>;

  private constructor() {
    this.client = new WakandaClient();
    this.catalog = this.client.getCatalog();
  }

  public static getInstance(): Client {
    if (!Client.instance) {
      Client.instance = new Client();
    }
    return Client.instance;
  }
}
