import { Metric, type MetricResult } from '@mastra/core/eval'

export class ToolArgMetric extends Metric {
  constructor() {
    super()
  }

  async measure(input, output) {
    console.log(`input: ${input}`)
    console.log(`output: ${output}`)
    return {
      score: 0,
      info: {}
    }
  }
}
