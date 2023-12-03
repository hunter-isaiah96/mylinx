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

## Environment Variables

DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET=
AUTH_ORIGIN=

## Database Connectivity

Your DATABASE_URL variable should look like this
![image](https://github.com/hunter-isaiah96/mylinx/assets/8966201/6d681a6d-851e-43e1-a8c8-526502650c2f)

If you get an SSL Version Number error, in your `DATABASE_URL` variable,
replace `?sslaccept=strict` with `?ssl={"rejectUnauthorized":true}`

Once you have your database url in your .env file, run

```bash
yarn db:push
```

This will create all of the tables in your database. Any time you make changes to the schema file in `@/drizzle/schema.ts`
and you want to save the changes to your database, run that same command.

To view and edit your database in an interface, run

```bash
yarn db:view
```

This will launch the drizzle-kit studio database viewer/editor.
![image](https://github.com/hunter-isaiah96/mylinx/assets/8966201/1a9b8a29-ab2d-4439-b881-58118bf4b06a)

## Environment
