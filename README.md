## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment variables

```bash

NODE_ENV=
PORT=
LOG_LEVEL=
USER_NAME=
GIT_TOKEN=
PARALLEL_PROCESS=
```

## Environment variables Description

```bash

NODE_ENV= (Set Node environment)
PORT= (Set Port on which application need to be run)
LOG_LEVEL= (Log level for application)
USER_NAME= (Github username)
GIT_TOKEN= (Github access token)
PARALLEL_PROCESS= (At once how many parallel processing should be allowed)
```

## Parallel Processing Description

- In Get Repo Details API we have restricted the execution on function level.
- Based on PARALLEL_PROCESS values set in environment, we allow parallel execution.
- Let's say we received 4 request at same time and value for PARALLEL_PROCESS is 2, with global execution counter we maintain current execution count and only 2 parallel execution will happened.
- For other two request has to wait until previous execution gets complete.
- Once execution start we have incremented counter and after execution completed we have decremented counter.
- With this way we have implemented parallel processing.
