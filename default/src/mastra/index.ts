import { Mastra } from "@mastra/core/mastra";
import { registerApiRoute } from "@mastra/core/server";
import { memoryAgent, myAgent } from "./agents";
import { 
  mySequentialWorkflow, 
  parallelWorkflow, 
  branchingWorkflow, 
  suspendableWorkflow, 
  guideParentWorkflow
} from "./workflows";
import { defaultStorage, defaultVector } from "./storage";
import { memoryTestRoutes } from "./routes/memory";

export const mastra = new Mastra({
    agents: {
        myAgent,
        memoryAgent,
    },
    workflows: {
        mySequentialWorkflow,
        parallelWorkflow,
        branchingWorkflow,
        suspendableWorkflow,
        guideParentWorkflow,
    },
    storage: defaultStorage,
    vectors: {
        default: defaultVector,
    },
    server: {
        middleware: [
            {
                path: '/hello',
                handler: async (_c, next) => {
                    console.log('Hello, world!!!!!');
                    return next();
                }
            }
        ],
        apiRoutes: [
            registerApiRoute('/hello', {
                method: 'GET',
                handler: async (c) => {
                    return c.json({ message: 'Hello, world!' });
                }
            }),
            registerApiRoute('/test/agent-generate-with-simple-tool', {
                method: 'GET',
                handler: async (c) => {
                    const mastra = c.get('mastra')
                    const agent = mastra.getAgent('myAgent')

                    const { text, steps } = await agent.generate('Use simple tool and return output')

                    const initialStep = steps?.[0];
                    return c.json({ message: text, toolCalls: initialStep?.toolCalls });
                }
            }),
            registerApiRoute('/test/agent-generate-with-mcp-docs-tool', {
                method: 'GET',
                handler: async (c) => {
                    const mastra = c.get('mastra')
                    const agent = mastra.getAgent('myAgent')

                    const { text, steps } = await agent.generate('Use the MCP Docs tool to find out what is Mastra and return output in one sentence')

                    const initialStep = steps?.[0];
                    return c.json({ message: text, toolCalls: initialStep?.toolCalls });
                }
            }),
            registerApiRoute('/test/agent-generate-with-rag-tool', {
                method: 'GET',
                handler: async (c) => {
                    const mastra = c.get('mastra')
                    const agent = mastra.getAgent('myAgent')

                    const { text, steps } = await agent.generate('Use the MCP Docs tool to find out what is Mastra and return output in one sentence')

                    const initialStep = steps?.[0];
                    return c.json({ message: text, toolCalls: initialStep?.toolCalls });
                }
            }),
            registerApiRoute('/test/agent-stream-with-simple-tool', {
                method: 'POST',
                handler: async (c) => {
                    const mastra = c.get('mastra')
                    const agent = mastra.getAgent('myAgent')

                    const result = await agent.stream('Use simple tool and return output')
                    return c.json({ message: result?.text, toolCalls: result?.toolCalls });
                }
            }),
            ...memoryTestRoutes,

        ]
    },
});
