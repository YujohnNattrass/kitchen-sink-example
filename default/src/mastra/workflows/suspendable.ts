import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";

// Define the suspendable workflow
export const suspendableWorkflow = new Workflow({
    name: "suspendable-workflow",
    triggerSchema: z.object({
        taskName: z.string(),
        description: z.string(),
        priority: z.enum(["low", "medium", "high"]).optional(),
    }),
});

// Initial step to process the task information
const prepareTaskStep = new Step({
    id: "prepare-task",
    description: "Prepares the task and formats initial information",
    outputSchema: z.object({
        taskId: z.string(),
        formattedTask: z.string(),
        createdAt: z.string(),
        priority: z.string(),
    }),
    execute: async ({ context }) => {
        const triggerData = context.getStepResult('trigger');
        const taskName = triggerData?.taskName || "Unnamed Task";
        const description = triggerData?.description || "No description provided";
        const priority = triggerData?.priority || "medium";
        
        // Generate a simple task ID
        const taskId = `TASK-${Date.now().toString().slice(-6)}`;
        
        // Format the task information
        const formattedTask = `Task: ${taskName}\nDescription: ${description}\nPriority: ${priority}`;
        
        // Get current date and time
        const createdAt = new Date().toLocaleString();
        
        return {
            taskId,
            formattedTask,
            createdAt,
            priority,
        };
    },
});

// Step that suspends the workflow and waits for user approval
const waitForApprovalStep = new Step({
    id: "wait-for-approval",
    description: "Suspends the workflow and waits for user approval",
    outputSchema: z.object({
        approved: z.boolean(),
        approvedBy: z.string(),
        approvalNotes: z.string(),
        approvalTime: z.string(),
    }),
    execute: async ({ context, suspend }) => {
        const taskInfo = context.getStepResult('prepare-task');

        // Suspend the workflow and wait for user input
        await suspend({
            message: `Task ${taskInfo?.taskId} requires approval.\n${taskInfo?.formattedTask}\nCreated at: ${taskInfo?.createdAt}`,
        });

        // This will only execute after the workflow is resumed with data
        return {
            approved: true,
            approvedBy: "User",
            approvalNotes: "Approved via workflow resume",            
            approvalTime: new Date().toLocaleString(),
        };
    },
});

// Final step that processes the task based on approval status
const finalizeTaskStep = new Step({
    id: "finalize-task",
    description: "Finalizes the task based on approval status",
    outputSchema: z.object({
        taskId: z.string(),
        status: z.string(),
        message: z.string(),
        completedAt: z.string(),
    }),
    execute: async ({ context }) => {
        const taskInfo = context.getStepResult('prepare-task');
        const approvalInfo = context.getStepResult('wait-for-approval');
        
        const taskId = taskInfo?.taskId || "UNKNOWN";
        const isApproved = approvalInfo?.approved || false;
        const approvedBy = approvalInfo?.approvedBy || "N/A";
        const approvalNotes = approvalInfo?.approvalNotes || "No notes provided";
        
        // Generate status and message based on approval
        const status = isApproved ? "APPROVED" : "REJECTED";
        let message = "";
        
        if (isApproved) {
            message = `Task ${taskId} was approved by ${approvedBy}. Notes: ${approvalNotes}`;
        } else {
            message = `Task ${taskId} was rejected by ${approvedBy}. Notes: ${approvalNotes}`;
        }
        
        // Get completion time
        const completedAt = new Date().toLocaleString();
        
        return {
            taskId,
            status,
            message,
            completedAt,
        };
    },
});

// Configure the workflow
suspendableWorkflow
    .step(prepareTaskStep)
    .then(waitForApprovalStep)
    .then(finalizeTaskStep)
    .commit();
