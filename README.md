# express-server-test

A Point of Sale (POS) REST API built with Express 5, following a Domain-Driven Design layered architecture. Supports product management and order creation with validation.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [pnpm](https://pnpm.io/installation) — package manager

## Install

```bash
pnpm install
```

## Run

```bash
pnpm start
```

The server starts at `http://localhost:3000`. Three seed products (Tacos al pastor, Quesadilla de pollo, Horchata) are inserted on every launch.

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | List all products |
| POST | `/api/products` | Create a product |
| POST | `/api/orders` | Create an order |
| GET | `/api/orders/:id` | Get order by ID |
