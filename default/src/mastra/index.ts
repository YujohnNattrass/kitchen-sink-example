import { Mastra } from "@mastra/core/mastra";
import { registerApiRoute } from "@mastra/core/server";
import { myAgent } from "./agents";
import { myWorkflow } from "./workflows";
import { netlifyDeployer } from "./deployers";

export const mastra = new Mastra({
    agents: {
        myAgent
    },
    workflows: {
        myWorkflow,
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
