import { createTool } from "@mastra/core/tools";
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