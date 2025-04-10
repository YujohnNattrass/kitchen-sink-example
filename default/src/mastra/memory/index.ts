import { Memory } from "@mastra/memory";

export const memory = new Memory({
    options: {
        semanticRecall: false,
    }
})

export const workingMemoryConfig = {
    workingMemory: {
        enabled: true,
        use: 'tool-call' as const,
        template: `# User Information
- **First Name**:
- **Last Name**:
- **Location**:
- **Interests**:
`,
    },
    lastMessages: 10,
    semanticRecall: {
        topK: 3,
        messageRange: 2,
    },
}

export const workingMemory = new Memory({
    options: {
        workingMemory: {
            enabled: true,
            use: 'tool-call',
            template: `# User Information
  - **First Name**:
  - **Last Name**:
  - **Location**:
  - **Interests**:
  `,
        },
        lastMessages: 10,
        semanticRecall: {
            topK: 3,
            messageRange: 2,
        },
    },
})
