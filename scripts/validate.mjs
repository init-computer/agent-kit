// Structural checks for the plugin marketplace and generated configs (no network).
import fs from "node:fs";
import assert from "node:assert/strict";

const json = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const marketplace = json(".claude-plugin/marketplace.json");
for (const plugin of marketplace.plugins) {
	const manifest = json(`${plugin.source}/.claude-plugin/plugin.json`);
	assert.equal(manifest.name, plugin.name, `${plugin.name}: plugin.json name mismatch`);
	assert.equal(manifest.version, plugin.version, `${plugin.name}: version mismatch`);
	assert.ok(json(`${plugin.source}/.mcp.json`).mcpServers.init, `${plugin.name}: init MCP server missing`);
	for (const file of [`${plugin.source}/commands/backend.md`, `${plugin.source}/skills/init-backend/SKILL.md`]) {
		assert.match(fs.readFileSync(file, "utf8"), /^---\n[\s\S]*?description: .+\n[\s\S]*?---\n/, `${file}: missing frontmatter`);
	}
}
for (const file of ["cursor/mcp.json", "vscode/mcp.json"]) json(file);
const readme = fs.readFileSync("README.md", "utf8");
const cursor = JSON.parse(Buffer.from(decodeURIComponent(readme.match(/install-mcp\?name=init&config=([^"]+)/)[1]), "base64").toString());
const vscode = JSON.parse(decodeURIComponent(readme.match(/redirect\/mcp\/install\?name=init&config=([^"]+)/)[1]));
for (const config of [cursor, vscode]) assert.deepEqual(config.args, ["-y", "@init-computer/mcp"]);
console.log("plugin, configs and install links are valid");
