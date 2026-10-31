// Renders every tool's rules and /backend command from src/. Run `npm run build` after editing src/.
// `node scripts/build.mjs --check` fails if the committed files are out of date.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, "src", file), "utf8").trim();
const guidance = read("guidance.md");
const reference = read("reference.md");
const command = (request) => read("backend.md").replace("{{REQUEST}}", request);
const body = (text) => text.replace(/^# .*\n+/, "");

const description = "Init: backend APIs for this project. Use when the app needs server-side logic, AI processing, data or file storage, email, webhooks, or scheduled jobs.";
const commandDescription = "Build or change a backend endpoint for this app with Init";
const hint = "<what the backend should do> | run <url> {json} | list";

const mcpServer = { command: "npx", args: ["-y", "@init-computer/mcp"], env: { INIT_API_KEY: "${INIT_API_KEY}" } };

const files = {
	// Claude Code plugin
	"plugins/init-computer/commands/backend.md": `---\ndescription: ${commandDescription}\nargument-hint: ${hint}\n---\n\n${command("$ARGUMENTS")}\n`,
	"plugins/init-computer/skills/init-backend/SKILL.md": `---\nname: init-backend\ndescription: ${description}\n---\n\n${guidance}\n\n${reference}\n`,
	"plugins/init-computer/.mcp.json": JSON.stringify({ mcpServers: { init: mcpServer } }, null, 2) + "\n",

	// Cursor
	"cursor/rules/init.mdc": `---\ndescription: ${description}\nalwaysApply: false\n---\n\n${guidance}\n`,
	"cursor/commands/backend.md": `${command("the text the user typed after /backend")}\n`,
	"cursor/mcp.json": JSON.stringify({ mcpServers: { init: { ...mcpServer, env: { INIT_API_KEY: "${env:INIT_API_KEY}" } } } }, null, 2) + "\n",

	// Windsurf
	"windsurf/rules/init.md": `---\ntrigger: model_decision\ndescription: ${description}\n---\n\n${guidance}\n`,
	"windsurf/workflows/backend.md": `---\ndescription: ${commandDescription}\n---\n\n${command("the text the user typed after /backend")}\n`,

	// GitHub Copilot in VS Code
	"copilot/copilot-instructions.md": `${guidance}\n`,
	"copilot/prompts/backend.prompt.md": `---\nmode: agent\ndescription: ${commandDescription}\n---\n\n${command("${input:request:What should the backend do?}")}\n`,
	"vscode/mcp.json": JSON.stringify({ inputs: [{ type: "promptString", id: "init-api-key", description: "Init API key", password: true }], servers: { init: { type: "stdio", command: "npx", args: ["-y", "@init-computer/mcp"], env: { INIT_API_KEY: "${input:init-api-key}" } } } }, null, 2) + "\n",

	// OpenAI Codex CLI
	"codex/prompts/backend.md": `---\ndescription: ${commandDescription}\nargument-hint: ${hint}\n---\n\n${command("$ARGUMENTS")}\n`,
	"codex/config.toml": `[mcp_servers.init]\ncommand = "npx"\nargs = ["-y", "@init-computer/mcp"]\nenv = { INIT_API_KEY = "init_sk_..." }\n`,

	// Cline
	"cline/.clinerules/init.md": `${guidance}\n`,
	"cline/.clinerules/workflows/backend.md": `${command("the text the user typed after /backend")}\n`,

	// Any agent that reads AGENTS.md
	"AGENTS.md": `${guidance}\n\n## /backend\n\nWhen the user types \`/backend <request>\`, follow these steps.\n\n${body(command("the text after /backend"))}\n`,
};

const check = process.argv.includes("--check");
let stale = [];
for (const [file, content] of Object.entries(files)) {
	const target = path.join(root, file);
	if (check) {
		if (!fs.existsSync(target) || fs.readFileSync(target, "utf8").replace(/\r\n/g, "\n") !== content) stale.push(file);
		continue;
	}
	fs.mkdirSync(path.dirname(target), { recursive: true });
	fs.writeFileSync(target, content);
}
if (check && stale.length) {
	console.error(`Out of date, run npm run build:\n  ${stale.join("\n  ")}`);
	process.exit(1);
}
console.log(check ? "generated files are up to date" : `wrote ${Object.keys(files).length} files`);
