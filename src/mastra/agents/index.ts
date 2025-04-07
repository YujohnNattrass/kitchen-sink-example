import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { memory } from "../memory";
import { simpleAssTool } from "../tools";

export const myAgent = new Agent({
    name: "my-agent",
    instructions: "My first agent",
    model: openai("gpt-4o-mini"),
    memory,
    tools: {
        simpleAssTool
    }
});