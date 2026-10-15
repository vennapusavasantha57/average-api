# Average API

A REST API built with Node.js and Express that calculates the running average of numbers submitted by a client.

## Features

- Submit numbers using the `POST /average` endpoint.
- Calculate the running average of submitted numbers.
- Validate input and reject invalid values.
- Handle malformed JSON requests.
- Automated tests using Node.js Test Runner and Supertest.
- Husky Git hooks to run tests before commits.
- Commitlint to validate Conventional Commit messages.

## Requirements

- Node.js
- npm
- Git

## Installation

Clone the repository:

```bash
git clone https://github.com/vennapusasantha57/average-api.git
cd average-api
```

Install dependencies:

```bash
npm install
```

## Run the API

```bash
npm start
```

The server runs at `http://localhost:3000` by default.

## API Usage

### POST `/average`

**URL:** `http://localhost:3000/average`

**Content-Type:** `application/json`

Example request body:

```json
{
  "number": 10
}
```

Example response:

```json
{
  "average": 10,
  "count": 1
}
```

The API also accepts a raw JSON number, such as `10`.

Submit the numbers `10`, `20`, and `30` in sequence. The running averages will be `10`, `15`, and `20`.

Invalid or missing numbers and malformed JSON return HTTP `400 Bad Request`.

## Run Tests

```bash
npm test
```

The automated test suite covers average calculations, raw numeric input, decimal numbers, input validation, and malformed JSON.

## Git Hooks

Husky runs the test suite before commits. Commitlint checks commit messages against the Conventional Commits format.

Examples of valid commit messages:

```text
feat: add average endpoint
test: expand API test coverage
docs: improve README
fix: handle invalid input
```

## License

MIT