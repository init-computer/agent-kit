## HTTP reference

Use this when neither MCP tools nor the CLI are available.

Generate or edit:

```http
POST https://api.init.computer/v1/generate
Authorization: Bearer $INIT_API_KEY
Content-Type: application/json

{ "prompt": "Create an API that accepts companyName and website and returns companyOverview, buyingSignals (array of {title, detail}) and nextSteps (array of strings)." }
```

To edit, add `"resource_id": "<resourceId>"` and describe only the change.

The response includes `result.url`, `result.resourceId`, `result.version`, `result.route`, `result.inputStructure.input`, `result.outputStructure.output` and `result.mode` (`create` or `edit`).

Run:

```http
POST <result.url>
Authorization: Bearer $INIT_API_KEY
Content-Type: application/json

{ "companyName": "Snowflake", "website": "https://www.snowflake.com" }
```

The response is `{ "success": true, "result": { ...declared output fields } }`. If you build the URL yourself, use `https://api.init.computer/v{version}/{route}`, never the route alone.

## Prompt patterns

- `Create an API that accepts [inputs] and returns [structured outputs].`
- `Return [field] as an array of objects with fields: [a], [b], [c].`
- `Create a multi-step API that first researches [topic], then generates [artifact], then saves [record] to a table.`
- `Every weekday at 8am, [do work] and email the result to [address].`
