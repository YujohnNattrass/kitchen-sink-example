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
import { MessageType } from "@mastra/core";
import { workingMemoryConfig } from "./memory";
const resourceId = 'resourceId1';

const memoryTest1 = registerApiRoute('/test/memory-test-1', {
    method: 'GET',
    handler: async (c) => {
        const testName = 'should handle LLM responses with working memory using OpenAI (test that the working memory prompt works)'
        const mastra = c.get('mastra')
        const agent = mastra.getAgent('memoryAgent')
        const threadId = `threadId1`;
        await agent.generate('Hi, my name is Tyler and I live in San Francisco', {
            threadId: threadId,
            resourceId,
        });

        const memory = agent.getMemory()
        if (!memory) {
            return c.json({ message: 'Memory not found' })
        }

        const thread = await memory.getThreadById({ threadId })
        const workingMemory = thread?.metadata?.workingMemory as string;
        console.log(JSON.stringify(workingMemory, null, 2))

        let result = workingMemory.includes('# User Information') && workingMemory.includes('Tyler') && workingMemory.includes('San Francisco')
        await memory.deleteThread(threadId)
        return c.json({ result, testName, testData: workingMemory }, 200);
    }
})

const memoryTest2 = registerApiRoute('/test/memory-test-2', {
    method: 'GET',
    handler: async (c) => {
        const testName = 'should handle LLM responses with working memory'
        const mastra = c.get('mastra')
        const memory = mastra.getAgent('memoryAgent').getMemory()
        if (!memory) {
            return c.json({ message: 'Memory not found' })
        }
        const threadId = `threadId2`;
        await memory.saveThread({
            thread: {
                id: threadId,
                title: 'Working Memory Test Thread',
                resourceId,
                metadata: {},
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        const messages = [
            {
                id: crypto.randomUUID(),
                threadId,
                role: 'user',
                type: 'text',
                content: 'Hi, my name is Tyler',
                createdAt: new Date(),
                resourceId,
            },
            {
                id: crypto.randomUUID(),
                threadId,
                role: 'assistant',
                type: 'text',
                content: `Hello Tyler! I'll remember your name.
  <working_memory>
  # User Information
  - **First Name**: Tyler
  - **Last Name**: 
  - **Location**: 
  - **Interests**: 
  </working_memory>`,
                createdAt: new Date(),
                resourceId,
            },
            {
                id: crypto.randomUUID(),
                threadId,
                role: 'user',
                type: 'text',
                content: 'I live in San Francisco',
                createdAt: new Date(),
                resourceId,
            },
            {
                id: crypto.randomUUID(),
                threadId,
                role: 'assistant',
                type: 'text',
                content: `Great city! I'll update my memory about you.
  <working_memory>
  # User Information
  - **First Name**: Tyler
  - **Last Name**: 
  - **Location**: San Francisco
  - **Interests**: 
  </working_memory>`,
                createdAt: new Date(),
                resourceId,
            },
        ] as MessageType[];

        await memory.saveMessages({ messages, memoryConfig: workingMemoryConfig });
        const thread = await memory.getThreadById({ threadId })
        const workingMemory = thread?.metadata?.workingMemory as string;

        const remembered = await memory.rememberMessages({
            threadId,
            config: { lastMessages: 10 },
        });
        const assistantMessages = remembered.messages.filter(m => m.role === 'assistant');
        const result = workingMemory &&
            workingMemory.includes('# User Information') &&
            workingMemory.includes('**First Name**: Tyler') &&
            workingMemory.includes('**Location**: San Francisco') &&
            !(assistantMessages[0].content as string).includes('<working_memory>') &&
            (assistantMessages[0].content as string).includes('Hello Tyler!') &&
            !(assistantMessages[1].content as string).includes('<working_memory>') &&
            (assistantMessages[1].content as string).includes('Great city!');
        await memory.deleteThread(threadId);
        return c.json({ result, testName, testData: workingMemory }, 200);
    }
});

const memoryTest3 = registerApiRoute('/test/memory-test-3', {
    method: 'GET',
    handler: async (c) => {
        const testName = 'should initialize with default working memory template'
        const mastra = c.get('mastra')
        const memory = mastra.getAgent('memoryAgent').getMemory()
        if (!memory) {
            return c.json({ message: 'Memory not found' })
        }
        const threadId = `threadId3`;
        await memory.saveThread({
            thread: {
                id: threadId,
                title: 'Working Memory Test Thread',
                resourceId,
                metadata: {},
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
        const thread = await memory.getThreadById({ threadId })
        const workingMemory = thread?.metadata?.workingMemory as string;
        const result = workingMemory &&
            workingMemory.includes('# User Information') &&
            workingMemory.includes('First Name');
        await memory.deleteThread(threadId);
        return c.json({ result, testName, testData: workingMemory }, 200);
    }
})

const memoryTest4 = registerApiRoute('/test/memory-test-4', {
    method: 'GET',
    handler: async (c) => {
        const testName = 'should update working memory from assistant messages'
        const mastra = c.get('mastra')
        const memory = mastra.getAgent('memoryAgent').getMemory()
        if (!memory) {
            return c.json({ message: 'Memory not found' })
        }

        const threadId = `threadId4`;
        await memory.saveThread({
            thread: {
                id: threadId,
                title: 'Working Memory Test Thread',
                resourceId,
                metadata: {},
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        const messages = [
            {
                id: crypto.randomUUID(),
                threadId,
                role: 'user',
                type: 'text',
                content: 'Hi, my name is John and I live in New York',
                createdAt: new Date(),
                resourceId,
            },
            {
                id: crypto.randomUUID(),
                threadId,
                role: 'assistant',
                type: 'text',
                content: `Nice to meet you! Let me update my memory.
  <working_memory>
  # User Information
  - **First Name**: John
  - **Last Name**: 
  - **Location**: New York
  - **Interests**: 
  </working_memory>`,
                createdAt: new Date(),
                resourceId,
            },
        ] as MessageType[];

        await memory.saveMessages({ messages, memoryConfig: workingMemoryConfig });
        const updatedThread = await memory.getThreadById({ threadId });
        const workingMemory = updatedThread?.metadata?.workingMemory as string;

        const result = workingMemory &&
            workingMemory.includes('# User Information') &&
            workingMemory.includes('**First Name**: John') &&
            workingMemory.includes('**Location**: New York');

        await memory.deleteThread(threadId);
        return c.json({ result, testName, testData: workingMemory }, 200);
    }
})

const memoryTest5 = registerApiRoute('/test/memory-test-5', {
    method: 'GET',
    handler: async (c) => {
        const testName = 'should handle multiple tool calls in memory thread history';
        const agent = c.get('mastra').getAgent('memoryAgent');

        const threadId = crypto.randomUUID();
        const stream1 = await agent.stream('what is the weather in LA?', {
            threadId,
            resourceId,
        });

        const chunks1: string[] = [];
        for await (const chunk of stream1.textStream) {
            chunks1.push(chunk);
        }
        const response1 = chunks1.join('');

        const stream2 = await agent.stream('what is the weather in Seattle?', {
            threadId,
            resourceId,
        });

        const chunks2: string[] = [];
        for await (const chunk of stream2.textStream) {
            chunks2.push(chunk);
        }
        const response2 = chunks2.join('');
        const result1 = chunks1.length > 0 &&
            response1.includes('Los Angeles') &&
            response1.includes('weather') &&
            response1.includes('70 degrees');
        const result2 = chunks2.length > 0 &&
            response2.includes('Seattle') &&
            response2.includes('weather') &&
            response2.includes('70 degrees');

        const result = result1 && result2;
        const memory = agent.getMemory();
        if (!memory) {
            return c.json({ message: 'Memory not found' })
        }
        await memory.deleteThread(threadId);
        return c.json({
            result,
            testName,
            testData: {
                response1,
                response2
            }
        }, 200);
    }
});

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
            memoryTest1,
            memoryTest2,
            memoryTest3,
            memoryTest4,
            memoryTest5,
        ]
    },
});
