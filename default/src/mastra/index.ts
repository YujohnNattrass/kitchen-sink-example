import { Mastra } from "@mastra/core/mastra";
import { registerApiRoute } from "@mastra/core/server";
import { myAgent } from "./agents";
import { 
  mySequentialWorkflow, 
  parallelWorkflow, 
  branchingWorkflow, 
  suspendableWorkflow, 
  guideParentWorkflow
} from "./workflows";
import { defaultStorage, defaultVector } from "./storage";

export const mastra = new Mastra({
    agents: {
        myAgent
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
            })
        ]
    },
});

