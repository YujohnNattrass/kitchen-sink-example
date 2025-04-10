import { mastra } from "./mastra";

const agent = mastra.getAgent('myAgent');

// const result = await agent.generate('Use simple tool and return output');
const { text, steps } = await agent.stream('Use simple tool and return output');

for (const chunk of await text) {
    console.log(chunk);
}

for (const step of await steps) {
    console.log(step);
}

// console.log(JSON.stringify({ text, steps }, null, 2));

