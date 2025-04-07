import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";

export const myWorkflow = new Workflow({
    name: "my-workflow",
    triggerSchema: z.object({
        hello: z.string(),
    }),
});

const myWorkflowStep = new Step({
    id: "my-workflow-step",
    description: "My first workflow step",
    execute: async ({ context }) => {
        return {
            result: `Hello ${context.getStepResult('trigger')?.hello}`
        }
    }
});

const agentStep = new Step({
    id: "agent-step",
    description: "My first agent step",
    outputSchema: z.object({
        result: z.string(),
    }),
    execute: async ({ mastra }) => {
        const result = await (mastra?.getAgent('myAgent'))?.generate('Hello World')
        return {
            result: result?.text ?? '',
        }
    }
});

myWorkflow.step(myWorkflowStep).then(agentStep).commit();

