# AGENTS.md — express-server-test

## Quick start
```bash
pnpm install    # already done
pnpm start      # node index.js → http://localhost:3000
```

- **Package manager:** pnpm (see `pnpm-lock.yaml`)
- **Module system:** CommonJS (`type: "commonjs"` in package.json)
- **No test framework configured.** Package.json test script is a placeholder. Add one (e.g., vitest, jest) before writing tests.
- **Express 5** not 4 — error middleware signature is `(err, req, res, next)`.

## Architecture (DDD-layered)
```
index.js → src/infrastructure/server.js (wiring)
  ├── domain/entities/       # Product, Order (plain classes, randomUUID ids)
  ├── domain/repositories/   # Abstract interfaces (ProductRepository, OrderRepository)
  ├── application/use-cases/ # Business logic (CreateProductUseCase, etc.)
  └── infrastructure/
      ├── controllers/       # Express req/res handlers, delegate to use cases
      ├── routes/            # Express Router factories
      └── repositories/      # InMemory*Repository (Map-based, no DB)
```

- **Dependency injection** wired manually in `server.js:buildApp()` — no DI framework.
- **3 seed products** inserted on every start (Tacos al pastor, Quesadilla, Horchata).

## API endpoints
| Method | Path | Body |
|--------|------|------|
| GET | `/api/products` | — |
| POST | `/api/products` | `{ name, price, stock }` |
| POST | `/api/orders` | `{ items: [{ productId, quantity }] }` |
| GET | `/api/orders/:id` | — |

## Notable conventions
- E**rror objects** thrown from use cases use a `.statusCode` property; caught by Express error middleware.
- **Config constants** in `src/constants.js` — PORT (3000), HTTP_STATUS, ORDER_STATUS.
- `dotenv` and `cookie-parser` are in `package.json` but **not wired in code**.
- **No database** — all data is in-memory (Map), lost on restart.
- IDs are `node:crypto` `randomUUID()` — auto-generated unless provided.
- Filename convention: `kebab-case` (e.g., `create-product.use-case.js`).

## Common gotchas
- Do not add `.env`-based config without verifying it's actually loaded (currently unused).
- Express 5 async error handling works via `next(err)` in catch blocks — `express-async-errors` is not needed.
- To add a new entity/feature, follow the existing pattern: domain entity → abstract repository → use case → controller → routes → wire in `server.js:buildApp()`.
