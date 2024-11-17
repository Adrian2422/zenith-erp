# ZenithErp

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/node?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/TYz7iiui5w)

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve server
```

To create a production bundle:

```sh
npx nx build server
```

To see all available targets to run for a project, run:

```sh
npx nx show project server
```

## Client

## Server

### Prisma migrate workflow

via [docs](https://www.prisma.io/docs/orm/prisma-migrate/workflows)

#### Dev

1. Create your schema and initial migration
2. Make changes (add table etc.)
3. Generate prisma client
4. Push changes to dev db: `npx prisma db push`
   1. If changes needed, repeat 2-4
5. If you need to reroll changes, use `npx prisma migrate reset`
6. If relatively stable, use `npx prisma migrate dev --name <migration_name>`
   1. add `--create-only` flag if you don't want to push any changed

#### Prod

1. Use `npx prisma migrate deploy` to apply migrations to db
