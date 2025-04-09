// import { PgVector, PostgresStore } from "@mastra/pg";

// export const connectionString = process.env.PG_CONNECTION_STRING;

// if (!connectionString) {
//     throw new Error("PG_CONNECTION_STRING environment variable is required");
// }

// export const pgVector = new PgVector(connectionString);

// export const pgStorage = new PostgresStore({ connectionString: connectionString });

import { DefaultStorage } from "@mastra/core/storage/libsql";
import { LibSQLVector } from "@mastra/core/vector/libsql";

export const defaultStorage = new DefaultStorage({
  config: {
    url: "file:mastra.db",
  },
});

export const defaultVector = new LibSQLVector({
  connectionUrl: "file:mastra.db",
});
