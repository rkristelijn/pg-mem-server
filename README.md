# pg-mem-server

Running a postgres server in memory for testing purposes.

This is just testing wrapping the package pg-mem to be able to run a stand-alone postgres server using only {Java|Type}Script.

## Usage

```bash
npm install # install dependencies
npm run build # build the project
npm start # start the dev server (build once first)
npm run db # start a real postgres db using docker
npm test # testing the app
```

## Status

This project doesn't work yet. It's just a proof of concept for discussing [Issue #2 in pg-server](https://github.com/oguimbal/pg-server/issues/2)

Current status is that the test run ok against the postgres docker image.

```bash
npm i # install dependencies
npm run db # start the docker image
npm t # start the test
```

```
 PASS  src/pg.spec.ts
  pg
    ✓ should create table (39 ms)
    ✓ should insert data (18 ms)
    ✓ should select data (14 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        2.526 s, estimated 3 s
```

Whereas when the server is start, you will get that when the database is connecting, it will fail.

Server response

```bash
docker-compose down # stop de docker image
npm start # start
npm t # start the test
```

Test response:

```
Exceeded timeout of 5000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout.
```

Server response

```
11:28:03 AM - Starting compilation in watch mode...
[0]
[1] ⚡️[server]: Postgres memory server is running at 5432
[0]
[0] 11:28:04 AM - Found 0 errors. Watching for file changes.
[1] ⚡️[server]: Postgres memory server is running at 5432
[1] ⚡️[server]: Postgres memory server is running at 5432
[1] 👤 Client connected, IP:  ::ffff:127.0.0.1
[1] 🤖 command:  {
[1]   type: 0,
[1]   version: { major: 3, minor: 0 },
[1]   options: { user: 'pgmem', database: 'pgmem', client_encoding: 'UTF8' }
[1] }
[1] 🤖 type:  startupMessage
[1] 🤖 command:  { type: 88 }
[1] 🤖 type:  readyForQuery
```

## Resources

- [pg](https://node-postgres.com/apis/client)
- [pg-mem](https://github.com/oguimbal/pg-mem)
- [pg-server](https://www.npmjs.com/package/pg-server)
