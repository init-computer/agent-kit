# Directory listings

Copy for submitting Init to MCP and plugin directories. Keep it in sync with the README.

## Shared copy

- **Name:** Init
- **Tagline (60 chars):** Type /backend. Get a live API.
- **Short description (160 chars):** Init generates live, typed backend APIs from a description: AI, search, storage, databases, email and scheduled jobs in one endpoint. Type /backend.
- **Long description:**
  Init is the backend engineer for your coding agent. Describe an endpoint in plain English and Init ships it as a live, typed, versioned HTTPS API in seconds, with auth and secrets handled. A single endpoint can combine LLM reasoning, web search and scraping, document processing, image, video and voice generation, email, maps, a database, file storage, compute and scheduled jobs. The agent kit adds a `/backend` command that generates the endpoint, wires it into your app and runs a real test call.
- **Category:** Developer tools / Backend / APIs
- **Tags:** backend, api, mcp, code-generation, ai-agents, serverless, database, scheduled-jobs
- **Website:** https://www.init.computer/mcp
- **Repository (MCP server):** https://github.com/init-computer/init (`packages/mcp`)
- **Repository (agent kit):** https://github.com/init-computer/agent-kit
- **npm:** `@init-computer/mcp`
- **Official MCP registry name:** `io.github.init-computer/init`
- **License:** MIT
- **Logo:** `plugins/init-computer/.claude-plugin/icon.png` (1024 × 1024)
- **Auth:** `INIT_API_KEY` environment variable (free plan available)
- **Tools:** `init_generate`, `init_generate_project`, `init_edit_project`, `init_apply_project_manifest`, `init_apply_project_file`, `init_run`, `init_list_resources`, `init_get_resource`, `init_list_packages`

Install config:

```json
{
  "mcpServers": {
    "init": {
      "command": "npx",
      "args": ["-y", "@init-computer/mcp"],
      "env": { "INIT_API_KEY": "init_sk_..." }
    }
  }
}
```

## Where to submit

| Directory | How | Status |
|---|---|---|
| Official MCP registry | GitHub Actions on `mcp-v*` tags in `init-computer/init` | Live (0.1.8) |
| awesome-mcp-servers (punkpeye) | Pull request | Opened |
| Cline MCP Marketplace | Issue on `cline/mcp-marketplace` | Opened |
| Claude plugin directory | Submit `init-computer/agent-kit`, plugin folder `plugins/init-computer`, in the Claude developer portal | Manual |
| Smithery | smithery.ai → Add server → `init-computer/init` (uses `smithery.yaml`) | Manual |
| Glama | glama.ai/mcp/servers → claim `init-computer/init` (uses the `Dockerfile`) | Manual |
| Cursor directory | cursor.directory → Submit → MCP, plus the rule in `cursor/rules/init.mdc` | Manual |
| mcp.so | mcp.so → Submit | Manual |
| PulseMCP | pulsemcp.com → Submit (also syncs from the official registry) | Manual |
| MCP Market | mcpmarket.com → Submit | Manual |
