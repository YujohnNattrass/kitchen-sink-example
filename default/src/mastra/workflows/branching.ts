import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";

/**
 * Branching Workflow Example
 * 
 * This workflow demonstrates how to implement conditional branching
 * based on order value. High-value orders get premium processing,
 * while standard orders follow a regular processing path.
 */
export const branchingWorkflow = new Workflow({
    name: "order-processing-workflow",
    triggerSchema: z.object({
        orderId: z.string(),
        orderValue: z.number(),
        customerName: z.string(),
        items: z.array(z.string()),
    }),
});

// Step 1: Evaluate the order and decide which path to take
const evaluateOrderStep = new Step({
    id: "evaluate-order",
    description: "Evaluates the order and determines processing path",
    outputSchema: z.object({
        orderId: z.string(),
        orderValue: z.number(),
        isPremium: z.boolean(),
        customerName: z.string(),
        itemCount: z.number(),
    }),
    execute: async ({ context }) => {
        const trigger = context.getStepResult('trigger');
        const orderValue = trigger?.orderValue || 0;
        const orderId = trigger?.orderId || "";
        const customerName = trigger?.customerName || "";
        const items = trigger?.items || [];
        
        // Orders over $500 are considered premium
        const isPremium = orderValue > 500;
        
        return {
            orderId,
            orderValue,
            isPremium,
            customerName,
            itemCount: items.length,
        };
    }
});

// Premium order processing path
const premiumProcessingStep = new Step({
    id: "premium-processing",
    description: "Processes high-value orders with premium service",
    outputSchema: z.object({
        result: z.string(),
        expeditedShipping: z.boolean(),
        giftIncluded: z.boolean(),
    }),
    execute: async ({ context }) => {
        const orderInfo = context.getStepResult('evaluate-order');
        
        // Create a personalized message for premium customers
        const personalizedMessage = `Thank you for your premium order ${orderInfo?.orderId}! We've added complimentary gift wrapping and expedited shipping.`;
        
        return {
            result: personalizedMessage,
            expeditedShipping: true,
            giftIncluded: true,
        };
    }
});

// Standard order processing path
const standardProcessingStep = new Step({
    id: "standard-processing",
    description: "Processes standard orders with regular service",
    outputSchema: z.object({
        result: z.string(),
        standardShipping: z.boolean(),
    }),
    execute: async ({ context }) => {
        const orderInfo = context.getStepResult('evaluate-order');
        
        // Create a standard confirmation message
        const standardMessage = `Your order ${orderInfo?.orderId} has been confirmed and will be processed with standard shipping.`;
        
        return {
            result: standardMessage,
            standardShipping: true,
        };
    }
});

// Final step that runs after either premium or standard processing
const finalizeOrderStep = new Step({
    id: "finalize-order",
    description: "Finalizes the order after processing",
    outputSchema: z.object({
        orderId: z.string(),
        processingResult: z.string(),
        finalStatus: z.string(),
        estimatedDelivery: z.string(),
        shippingMethod: z.string(),
    }),
    execute: async ({ context }) => {
        const orderInfo = context.getStepResult('evaluate-order');
        const premiumResult = context.getStepResult('premium-processing');
        const standardResult = context.getStepResult('standard-processing');
        
        // Determine which path was taken
        const isPremium = orderInfo?.isPremium || false;
        const processingResult = isPremium 
            ? premiumResult?.result 
            : standardResult?.result;
        
        // Calculate estimated delivery based on shipping method
        const today = new Date();
        let deliveryDays = isPremium ? 2 : 5; // Premium gets faster delivery
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + deliveryDays);
        
        // Format the date as a string
        const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
        
        // Create a final confirmation message
        const shippingMethod = isPremium ? "Expedited Shipping (2-day)" : "Standard Shipping (5-day)";
        
        return {
            orderId: orderInfo?.orderId || "",
            processingResult: processingResult || "",
            finalStatus: isPremium ? "Premium Order Completed" : "Standard Order Completed",
            estimatedDelivery,
            shippingMethod,
        };
    }
});

// Configure the workflow with branching logic
branchingWorkflow
    .step(evaluateOrderStep)
    .then(premiumProcessingStep, {
        when: { 'evaluate-order.isPremium': true }
    })
    .after(evaluateOrderStep)
    .step(standardProcessingStep, {
        when: { 'evaluate-order.isPremium': false }
    })
    .after([premiumProcessingStep, standardProcessingStep])
    .step(finalizeOrderStep)
    .commit();
