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

NODE_ENV= (Node environment)
PORT= (Port on which application will run)
LOG_LEVEL= (Log level for application)
USER_NAME= (Github username)
GIT_TOKEN= (Github access token)
PARALLEL_PROCESS= (The number of parallel processes allowed)
```

## Parallel Processing Description

- Within the Get Repo Details API, our focus lies in refining execution controls at the function level.
- By considering the values encapsulated within PARALLEL_PROCESS within the environment, we can gracefully introduce the concept of concurrent processing.
- Imagine a scenario where 4 requests converge simultaneously while the PARALLEL_PROCESS parameter is set at 2; here, we administer a universal tally to monitor the ongoing execution count, exclusively permitting 2 parallel operations.
- Consequently, the remaining 2 requests gracefully bide their time, poised for action until the antecedent executions conclude their course.
- As each execution commences, our numeric gauge ascends, only to be decremented upon their culmination.
- Through this meticulous methodology, we effectively materialize the prospect of parallel processing.
