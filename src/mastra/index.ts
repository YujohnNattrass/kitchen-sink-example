import { Mastra } from "@mastra/core/mastra";
import { myAgent } from "./agents";
import { myWorkflow } from "./workflows";

export const mastra = new Mastra({
    agents: {
        myAgent
    },
    workflows: {
        myWorkflow,
    }
});