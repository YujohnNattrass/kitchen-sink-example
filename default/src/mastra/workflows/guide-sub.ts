import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";

// Step to create a greeting
const createGreetingStep = new Step({
    id: "create-greeting",
    description: "Creates a greeting in the specified language",
    outputSchema: z.object({
        greeting: z.string(),
        language: z.string(),
    }),
    execute: async ({ context }) => {
        // In Mastra, variables are passed directly to the step execution context
        // We need to access them from the step trigger data
        const triggerData = context.getStepResult('trigger');
        const name = triggerData?.name || "Friend";
        const language = triggerData?.language || "english";
        
        let greeting = "";
        
        // Create greeting based on language
        switch (language) {
            case "spanish":
                greeting = `¡Hola, ${name}!`;
                break;
            case "french":
                greeting = `Bonjour, ${name}!`;
                break;
            case "english":
            default:
                greeting = `Hello, ${name}!`;
                break;
        }
        
        return {
            greeting,
            language,
        };
    },
});

// Define a sub-workflow that follows the guide's approach
export const guideSubWorkflow = new Workflow({
    name: "guide-sub-workflow",
    triggerSchema: z.object({
        name: z.string(),
        language: z.enum(["english", "spanish", "french"]),
    }),
    result: {
        schema: z.object({
            greeting: z.string(),
        }),
        mapping: {
            greeting: {
                step: "create-greeting",
                path: "greeting",
            },
        },
    },
})
    .step(createGreetingStep)
    .commit();
