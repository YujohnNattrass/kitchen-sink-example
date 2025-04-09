import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";
import { guideSubWorkflow } from "./guide-sub";

// Step to prepare the final message
const createMessageStep = new Step({
    id: "create-message",
    description: "Creates the final message combining the greeting and user message",
    outputSchema: z.object({
        finalMessage: z.string(),
        timestamp: z.string(),
    }),
    execute: async ({ context }) => {
        const triggerData = context.getStepResult('trigger');
        const message = triggerData?.message || "Have a nice day!";
        const greeting = context.getStepResult('guide-sub-workflow')?.result?.greeting || "Hello there!";
        
        // Combine the greeting and message
        const finalMessage = `${greeting} ${message}`;
        
        return {
            finalMessage,
            timestamp: new Date().toISOString(),
        };
    },
});

// Define the parent workflow that follows the guide's approach
export const guideParentWorkflow = new Workflow({
    name: "guide-parent-workflow",
    triggerSchema: z.object({
        userName: z.string(),
        preferredLanguage: z.enum(["english", "spanish", "french"]),
        message: z.string(),
    }),
    result: {
        schema: z.object({
            finalMessage: z.string(),
            timestamp: z.string(),
        }),
        mapping: {
            finalMessage: {
                step: "create-message",
                path: "finalMessage",
            },
            timestamp: {
                step: "create-message",
                path: "timestamp",
            },
        },
    },
})
    // Use the sub-workflow directly as a step, passing variables from the trigger
    .step(guideSubWorkflow, {
        variables: {
            name: {
                step: "trigger",
                path: "userName",
            },
            language: {
                step: "trigger",
                path: "preferredLanguage",
            },
        },
    })
    // Then continue with our own step
    .then(createMessageStep, {
        variables: {
            message: {
                step: "trigger",
                path: "message",
            },
        },
    })
    .commit();
