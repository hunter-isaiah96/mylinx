# MyLinx Linktr.ee Clone built with Nuxt, Vuetify, Planetscale and Drizzle ORM

![image](https://github.com/hunter-isaiah96/mylinx/assets/8966201/3265c190-51ae-458c-b4a7-2deee617bcac)

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Database Connectivity

You will need to create a .env file with your Planetscale database url the DATABASE_URL variable.
Once you have your database url in your .env file, run

```bash
yarn db:push
```

This will create all of the tables in your database. Any time you make changes to the schema file
and you want to save them to your database, run

```bash
yarn db:push
```

To view and edit your database in an interface, use the comment

```bash
yarn db:view
```

to launch the drizzle-kit studio database viewer/editor.
