---
description: Build or change a backend endpoint for this app with Init
argument-hint: <what the backend should do> | run <url> {json} | list
---

Build or change a backend for this app with Init.

Request: $ARGUMENTS

1. If the request is empty, ask what the backend should do and stop.
2. If the request starts with `list`, call `init_list_resources` and show each endpoint's name, URL and version. Stop.
3. If the request starts with `run`, it's followed by a route or URL and optional JSON. Call `init_run` with them, show the result and stop.
4. Otherwise, check whether the request changes an endpoint the project already uses. Look in `init.json`, `.env*` entries named `INIT_*_URL`, and existing code that calls `api.init.computer`.
   - If it does, find the endpoint's `resourceId` with `init_list_resources` or `init_get_resource`. Then call `init_generate` with `resource_id` and a prompt that describes only the change.
   - If it doesn't, call `init_generate` with a precise prompt. Say what the endpoint accepts and what it returns, name every output field (with the columns of arrays and the fields of objects), and add any schedule, storage, email or webhook behavior.
5. Show the endpoint: URL, version, input fields and output fields.
6. Wire it into the app:
   - Put the URL in configuration as `INIT_<NAME>_URL`.
   - Add a typed server-side helper that POSTs JSON matching the input fields, with `Authorization: Bearer $INIT_API_KEY` read from the environment.
   - Call the helper where the app needs it.
   - If the endpoint was edited, replace the old URL everywhere, because the version in the URL changed.
   - Never expose the API key to client-side code.
7. Call the endpoint once with realistic sample input, then report what it returned.

If the Init MCP tools aren't available, use the CLI instead: `npx -y @init-computer/cli generate "<prompt>" --json`, `init run <url> --data key=value --json` and `init resources --json`. Then tell the user that `npx -y @init-computer/mcp` connects the MCP server. If no API key is configured, tell the user to create one at https://www.init.computer/console/secrets and set `INIT_API_KEY`.
