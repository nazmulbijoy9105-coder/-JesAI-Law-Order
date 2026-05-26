# -JesAI-Law-Order

## Development environment

This is a Next.js application managed with npm.

### Setup

```bash
npm ci
```

### Run locally

```bash
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Open http://localhost:3000.

### Validate the environment

```bash
npm run typecheck
npm run build
curl -I http://localhost:3000/
curl -sS -X POST http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  --data '{"message":"What should I do about a land dispute?","selectedArea":"property"}'
```
