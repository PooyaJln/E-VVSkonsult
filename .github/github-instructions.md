# Copilot Instructions for Incremental TS Migration (src → dist)

Purpose
- Guide code suggestions during incremental migration from JavaScript to TypeScript.
- Keep runtime CommonJS while authoring with ESM-style imports.
- Use vanilla Sequelize v6, not `sequelize-typescript`.

Project conventions
- Directory layout:
  - Source TypeScript in `src/`
  - Compiled output in `dist/`
  - Migrations and seeders remain JavaScript in `migrations/` and `seeders/`
- TypeScript settings (assume `tsconfig.json`):
  - `module: "CommonJS"`, `target: "ES2020"`, `moduleResolution: "Node16"`
  - `rootDir: "src"`, `outDir: "dist"`
  - `allowJs: true`, `checkJs: true` (for incremental migration)
  - Moderate strictness: `strict: false`, but `noImplicitAny: true`, `strictNullChecks: true`
  - `esModuleInterop: true`, `allowSyntheticDefaultImports: true`
  - `resolveJsonModule: true`, `skipLibCheck: true`, `sourceMap: true`
- Dev workflow:
  - Build: `tsc --watch` to `dist/`
  - Run: `nodemon` watches `dist/`
  - Start prod: `node dist/server.js`

General guidance
- Use ESM-style imports in `.ts`: `import express from 'express'`, `import { Sequelize } from 'sequelize'`
- Do not use `require()` in `.ts` files.
- Do not switch the project to native ESM (no `"type": "module"`), unless explicitly requested.
- Keep migrations and seeders in JavaScript (not TypeScript).
- Preserve API behavior and response shapes while adding types.
- Favor minimal, explicit types. Use `any` only as a last resort (moderate strictness).
- Do not introduce new libraries (validation, logging, etc.) unless asked.

When converting files from JS to TS
- Move files into `src/` and change extension to `.ts`
- Replace `module.exports`/`exports` with `export`/`export default`
- Replace `require()` with ESM `import` syntax
- Add types progressively (parameters, return types, model attributes)
- Keep the same public API (routes, status codes, JSON schema) unless otherwise specified
- If a type is unclear:
  - Prefer `unknown` over `any` and narrow where feasible
  - Use minimal type aliases or interfaces colocated with usage
- Avoid path aliases unless `tsconfig` `paths` is configured

Environment and configuration
- Load env via `import 'dotenv/config'` in entry points or use a small `env` helper.
- Centralize env parsing in `src/config/env.ts`, export a single `env` object.
- Do not hardcode secrets; use `process.env`.

Express conventions
- Express app in `src/server.ts` (entry point)
- Use JSON middleware: `app.use(express.json())`
- Route handlers:
  - Type with `Request`, `Response`, `NextFunction` from `express`
  - Use `async/await` and pass errors to `next(err)` (don’t swallow)
  - Example:
    ```ts
    import { Request, Response, NextFunction } from 'express';

    export async function getUser(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        // ... fetch
        res.json({ id });
      } catch (err) {
        next(err);
      }
    }
    ```
- Keep a basic `/health` route returning `{ ok: true }`

Sequelize (vanilla v6) conventions
- Initialize once in `src/db/sequelize.ts`:
  ```ts
  import { Sequelize } from 'sequelize';
  import { env } from '../config/env';

  export const sequelize = new Sequelize(env.databaseUrl, {
    logging: env.nodeEnv === 'development' ? console.log : false
  });
  ```
- Models in `src/db/models/`, one class per file, export named classes
- Use `Model<InferAttributes<M>, InferCreationAttributes<M>>`
- Use `CreationOptional<T>` for auto fields (id, timestamps)
- Prefer `underscored: true` if DB columns are snake_case; map to camelCase model fields
- Do not use decorators (`sequelize-typescript` is not used)
- Example model:
  ```ts
  import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
  } from 'sequelize';
  import { sequelize } from '../sequelize';

  export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
  > {
    declare id: CreationOptional<number>;
    declare email: string;
    declare name: string | null;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
  }

  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      name: { type: DataTypes.STRING, allowNull: true }
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      underscored: true
    }
  );
  ```
- Define associations in `src/db/models/index.ts` or dedicated association module without circular imports

Migrations and seeders (JavaScript)
- Keep in `migrations/` and `seeders/` as `.js`
- Use `sequelize-cli` configuration via `.sequelizerc`
- Example migration:
  ```js
  'use strict';

  module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('users', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false, unique: true },
        name: { type: Sequelize.STRING, allowNull: true },
        created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
        updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') }
      });
    },
    async down(queryInterface) {
      await queryInterface.dropTable('users');
    }
  };
  ```
- Do not generate TS migrations; do not import TS from migrations

Scripts and tooling (assumptions Copilot should align with)
- `build`: `tsc -p tsconfig.json`
- `build:watch`: `tsc -w -p tsconfig.json`
- `serve`: `nodemon` (reads `nodemon.json`, runs `node dist/server.js`)
- `dev`: run `build:watch` and `serve` concurrently
- `start`: `node dist/server.js`
- `typecheck`: `tsc --noEmit`
- DB scripts via `sequelize-cli` (e.g., `db:migrate`, `db:migrate:undo`, `db:seed`)

File and naming conventions
- Filenames: kebab-case for files (`user.controller.ts`), PascalCase for classes (`User`)
- Keep `src/server.ts` as the app entry
- Keep `src/db/models/` for Sequelize models
- Keep `src/routes/` for route definitions and `src/controllers/` for handler logic
- Use named exports over default exports for models and utilities

Error handling and logging
- Use `console.log`/`console.error` for now (no new logging libs)
- Optional error middleware in `src/middleware/error.ts`; if added, register after routes
- Do not call `sequelize.sync({ force: true })` in production code

Incremental migration checklist (per file)
- Move to `src/` and convert to `.ts`
- Replace `require`/`module.exports` with ESM imports/exports
- Add minimal types to function parameters and return values
- Import types from libraries (`@types/express`, `@types/node`, etc.)
- Ensure imports are resolvable from `src/`; avoid deep relative chains where possible
- Build runs cleanly (`npm run typecheck`), then `npm run dev`

Examples to prefer
- Express import:
  ```ts
  import express from 'express';
  ```
- Dotenv:
  ```ts
  import 'dotenv/config';
  ```
- Sequelize import:
  ```ts
  import { Sequelize } from 'sequelize';
  ```

Anti-patterns to avoid
- `require()` in `.ts` files
- Adding decorators or `sequelize-typescript`
- Changing runtime to ESM (`"type": "module"`)
- Writing migrations in TypeScript
- Introducing new dependencies without instruction
- Using implicit `any` where a clear type is available

If unsure about a type
- Use `unknown`, narrow with runtime checks if needed
- For request bodies/params, type minimally or add a local interface
- Add `CreationOptional<>` for auto-generated fields in Sequelize models

Acceptance criteria for generated code
- Compiles under the provided `tsconfig`
- Runs via `npm run dev` (tsc watch + nodemon on `dist/`)
- Maintains existing API contracts and behavior
- No usage of `sequelize-typescript`, decorators, or native ESM runtime

Note for Copilot
- Default to the patterns and templates above.
- Prefer small, focused changes that maintain backward compatibility while improving types gradually.