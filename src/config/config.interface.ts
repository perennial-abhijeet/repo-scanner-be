/**
 * Configuration data for the app.
 */
export interface ConfigData {
  /** Node application environment */
  env: string;

  /** The port number of the http server to listen on. */
  port: number;

  /** Log level */
  logLevel: string;
}
