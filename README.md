<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/assets/init-lockup-on-dark.svg">
    <img alt="Init" src=".github/assets/init-lockup.svg" height="64">
  </picture>
</p>

<h3 align="center">Type <code>/backend</code>. Get a live API.</h3>

<p align="center">The Init agent kit adds one command to Claude Code, Cursor, Windsurf, Copilot, Codex and Cline.</p>

<p align="center">
  <a href="https://cursor.com/en/install-mcp?name=init&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBpbml0LWNvbXB1dGVyL21jcCJdLCJlbnYiOnsiSU5JVF9BUElfS0VZIjoiIn19"><img alt="Add to Cursor" src="https://cursor.com/deeplink/mcp-install-dark.svg" height="32"></a>
  <a href="https://insiders.vscode.dev/redirect/mcp/install?name=init&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40init-computer%2Fmcp%22%5D%2C%22env%22%3A%7B%22INIT_API_KEY%22%3A%22%22%7D%7D"><img alt="Install in VS Code" src="https://img.shields.io/badge/VS_Code-Install_Init-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white" height="32"></a>
</p>

---

```
/backend email me the top Hacker News posts every morning
/backend an API that extracts line items and totals from an uploaded invoice PDF
/backend add a confidence score to the lead scoring endpoint
/backend list
```

Your agent describes the endpoint to [Init](https://www.init.computer/?utm_source=github&utm_medium=agent-kit). Init builds it as a live, typed, versioned HTTPS API. Then the agent wires it into your app: the URL goes in config, it writes a typed server-side helper, and it runs one real test call. A single endpoint can combine LLM reasoning, web search and scraping, document processing, image and voice generation, email, a database, file storage and scheduled jobs.

You need an Init API key. Create one at [init.computer](https://www.init.computer/sign-up?utm_source=github&utm_medium=agent-kit) and set it as `INIT_API_KEY`.

## Install

### Claude Code

```
/plugin marketplace add init-computer/agent-kit
/plugin install init-computer@init-computer
```

This adds the `/backend` command, an `init-backend` skill that tells Claude when to reach for Init, and the Init MCP server. Set `INIT_API_KEY` in your shell before you start `claude`. If another plugin also defines `/backend`, use `/init-computer:backend`.

If you only want the MCP server:

```bash
claude mcp add init --env INIT_API_KEY=init_sk_... -- npx -y @init-computer/mcp
```

### Cursor

Click **Add to Cursor** above, or copy [`cursor/mcp.json`](cursor/mcp.json) to `.cursor/mcp.json`. Then add the command and the rule:

```bash
mkdir -p .cursor/commands .cursor/rules
curl -fsSL https://raw.githubusercontent.com/init-computer/agent-kit/main/cursor/commands/backend.md -o .cursor/commands/backend.md
curl -fsSL https://raw.githubusercontent.com/init-computer/agent-kit/main/cursor/rules/init.mdc -o .cursor/rules/init.mdc
```

### VS Code (GitHub Copilot)

Click **Install in VS Code** above, or copy [`vscode/mcp.json`](vscode/mcp.json) to `.vscode/mcp.json`. It prompts for your key. Then add the prompt file and instructions:

```bash
mkdir -p .github/prompts
curl -fsSL https://raw.githubusercontent.com/init-computer/agent-kit/main/copilot/prompts/backend.prompt.md -o .github/prompts/backend.prompt.md
curl -fsSL https://raw.githubusercontent.com/init-computer/agent-kit/main/copilot/copilot-instructions.md >> .github/copilot-instructions.md
```

Use `/backend` in Copilot Chat agent mode.

### Windsurf

Add the server in **Settings → Cascade → MCP servers**, using the same JSON as [`cursor/mcp.json`](cursor/mcp.json) with your key. Then:

```bash
mkdir -p .windsurf/workflows .windsurf/rules
curl -fsSL https://raw.githubusercontent.com/init-computer/agent-kit/main/windsurf/workflows/backend.md -o .windsurf/workflows/backend.md
curl -fsSL https://raw.githubusercontent.com/init-computer/agent-kit/main/windsurf/rules/init.md -o .windsurf/rules/init.md
```

### Codex CLI

Add [`codex/config.toml`](codex/config.toml) to `~/.codex/config.toml` with your key, then:

```bash
mkdir -p ~/.codex/prompts
curl -fsSL https://raw.githubusercontent.com/init-computer/agent-kit/main/codex/prompts/backend.md -o ~/.codex/prompts/backend.md
```

Run it as `/prompts:backend <request>`.

### Cline

Add the server from Cline's MCP settings using the JSON in [`cursor/mcp.json`](cursor/mcp.json). Then copy [`cline/.clinerules`](cline/.clinerules) into your project. The workflow runs as `/backend.md`.

### Any other agent

Add [`AGENTS.md`](AGENTS.md) to your project root, or append it to your existing one. It covers when to use Init, how to wire endpoints in safely, and the `/backend` steps. Then connect the MCP server with:

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

## What's in here

| Path | For |
|---|---|
| `.claude-plugin/`, `plugins/init-computer/` | Claude Code plugin marketplace, `/backend` command, skill, MCP config |
| `cursor/` | Command, rule, MCP config |
| `copilot/`, `vscode/` | Prompt file, instructions, MCP config |
| `windsurf/` | Workflow and rule |
| `codex/` | Prompt and config |
| `cline/` | Rules and workflow |
| `AGENTS.md` | Works with any agent |
| `src/` | Single source for everything above |

Every tool's files are generated from `src/` by `npm run build`. Edit `src/`, rebuild, and commit both. CI fails if they drift.

## Related

- [init-computer/init](https://github.com/init-computer/init): the CLI, SDK and MCP server
- [init-computer/examples](https://github.com/init-computer/examples): runnable examples

## License

[MIT](LICENSE)
