import { VercelDeployer } from "@mastra/deployer-vercel";
import { CloudflareDeployer } from "@mastra/deployer-cloudflare";
import { NetlifyDeployer } from "@mastra/deployer-netlify";

export const vercelDeployer = new VercelDeployer({
  token: process.env.VERCEL_TOKEN!,
  teamSlug: process.env.VERCEL_TEAM_SLUG!,
  projectName: process.env.VERCEL_PROJECT_NAME!,
})

export const cloudflareDeployer = new CloudflareDeployer({
  scope: process.env.CLOUDFLARE_SCOPE!,
  projectName: process.env.CLOUDFLARE_PROJECT_NAME!,
  auth: {
    apiToken: process.env.CLOUDFLARE_API_TOKEN!,
  }
})

export const netlifyDeployer = new NetlifyDeployer({
  token: process.env.NETLIFY_TOKEN!,
  scope: process.env.NETLIFY_ACCOUNT_SLUG!,
  projectName: process.env.NETLIFY_PROJECT_NAME!,
})
