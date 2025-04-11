
import { DefaultStorage } from "@mastra/core/storage/libsql";
import { DefaultVectorDB, LibSQLVector } from "@mastra/core/vector/libsql";

export const defaultStorage = new DefaultStorage({
  config: {
    url: "file:mastra.db",
  },
});

export const defaultVector = new DefaultVectorDB({
  connectionUrl: "file:mastra.db",
});
