import { createTool } from "@mastra/core/tools";
import { openai } from '@ai-sdk/openai';
import { createVectorQueryTool } from "@mastra/rag";
import { z } from "zod";

export const simpleAssTool = createTool({
    id: "simple-ass",
    description: "A simple tool that does nothing",
    inputSchema: z.object({
        hello: z.string(),
    }),
    outputSchema: z.object({
        goodbye: z.string(),
    }),
    execute: async ({ context }) => {
        return {
            goodbye: `Goodbye ${context.hello}`
        }
    }
})

export const queryTool = createVectorQueryTool({
    vectorStoreName: 'default',
    indexName: 'kitchenSink',
    model: openai.embedding("text-embedding-3-small"),
})

export const weatherTool = createTool({
    id: 'get_weather',
    description: 'Get the weather for a given location',
    inputSchema: z.object({
      postalCode: z.string().describe('The location to get the weather for'),
    }),
    execute: async ({ context: { postalCode } }) => {
      return `The weather in ${postalCode} is sunny. It is currently 70 degrees and feels like 65 degrees.`;
    },
  });
