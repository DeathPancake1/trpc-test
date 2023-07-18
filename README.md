# A minimal working tRPC example

Requires node 18 (for global fetch).

## Start Dev Demo

```
sudo service postgresql start
npm i
prisma migrate dev --name init
npm run dev:server
npm run dev:client
```

## Enviroment Variables

Make sure to create a ```.env``` file with valid postgres server credentials

```
DATABASE_URL="postgresql://prisma:password@localhost:5432/trpc?schema=public"
```
