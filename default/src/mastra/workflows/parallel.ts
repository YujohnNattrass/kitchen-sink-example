import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";

/**
 * Parallel Workflow Example
 * 
 * This workflow demonstrates how to run multiple steps in parallel
 * and then merge their results in a final step.
 */
export const parallelWorkflow = new Workflow({
    name: "parallel-workflow",
    triggerSchema: z.object({
        query: z.string(),
        category: z.string().optional(),
    }),
});

// First parallel step - uses agent to analyze product information
const productAnalysisStep = new Step({
    id: "product-analysis",
    description: "Uses agent to analyze product information",
    outputSchema: z.object({
        productAnalysis: z.string(),
        processingTime: z.number(),
    }),
    execute: async ({ context, mastra }) => {
        const startTime = Date.now();
        const query = context.getStepResult('trigger')?.query || "";
        const category = context.getStepResult('trigger')?.category || "all";
        
        // Get the agent and generate a response about products
        const agent = mastra?.getAgent('myAgent');
        const result = await agent?.generate(`Analyze the following products: ${query}. Focus on products in the ${category} category. Include pricing trends and stock levels. Keep it in 1 sentence.`);
        
        return {
            productAnalysis: result?.text || "No product analysis available",
            processingTime: Date.now() - startTime,
        };
    }
});

// Second parallel step - uses agent to analyze customer information
const customerAnalysisStep = new Step({
    id: "customer-analysis",
    description: "Uses agent to analyze customer information",
    outputSchema: z.object({
        customerAnalysis: z.string(),
        processingTime: z.number(),
    }),
    execute: async ({ context, mastra }) => {
        const startTime = Date.now();
        const query = context.getStepResult('trigger')?.query || "";
        
        // Get the agent and generate a response about customers
        const agent = mastra?.getAgent('myAgent');
        const result = await agent?.generate(`Analyze customer behavior related to: ${query}. Focus on purchasing patterns, loyalty points, and demographics. Keep it in 1 sentence.`);
        
        return {
            customerAnalysis: result?.text || "No customer analysis available",
            processingTime: Date.now() - startTime,
        };
    }
});

// Final step - merges results from both parallel paths and generates a comprehensive report
const generateReportStep = new Step({
    id: "generate-report",
    description: "Combines analyses and generates a comprehensive report",
    outputSchema: z.object({
        report: z.string(),
        productAnalysisTime: z.number(),
        customerAnalysisTime: z.number(),
        totalProcessingTime: z.number(),
    }),
    execute: async ({ context, mastra }) => {
        const productResult = context.getStepResult('product-analysis');
        const customerResult = context.getStepResult('customer-analysis');
        
        // Get the agent to generate a comprehensive report
        const agent = mastra?.getAgent('myAgent');
        const combinedAnalysis = `
Product Analysis: ${productResult?.productAnalysis}

Customer Analysis: ${customerResult?.customerAnalysis}`;
        
        const result = await agent?.generate(`Create a comprehensive business report that combines the following analyses. Format it professionally with clear sections and actionable insights:\n${combinedAnalysis}. Keep it in 1 sentence.`);
        
        return {
            report: result?.text || "No report available",
            productAnalysisTime: productResult?.processingTime || 0,
            customerAnalysisTime: customerResult?.processingTime || 0,
            totalProcessingTime: (productResult?.processingTime || 0) + (customerResult?.processingTime || 0),
        };
    }
});

// Configure the workflow:
// 1. Run product analysis and customer analysis in parallel
// 2. After both complete, generate a comprehensive report
parallelWorkflow
    .step(productAnalysisStep)
    .step(customerAnalysisStep)
    .after([productAnalysisStep, customerAnalysisStep])
    .step(generateReportStep)
    .commit();

// Export a function to run the workflow
// export const runParallelWorkflow = async (query: string, category?: string) => {
//     const run = parallelWorkflow.createRun();
//     return await run.start({
//         triggerData: { query, category }
//     });
// };
