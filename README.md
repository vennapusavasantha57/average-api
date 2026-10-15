# Average API

A Node.js and Express REST API that calculates the running average of numbers submitted by the client.

## Features

- POST endpoint for submitting numbers
- Running average calculation
- Input validation
- Automated tests using Node.js Test Runner and Supertest
- Husky Git hooks
- Conventional Commit message validation

## Requirements

- Node.js
- npm

## Installation

Clone the repository, then run:

```bash
npm install
```

## Run the API

```bash
npm start
```

The server runs at `http://localhost:3000`.

## API Usage

### POST /average

Request body:

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

Submit additional numbers to update the running average.

Invalid or missing numbers return HTTP 400.

## Run Tests

```bash
npm test
```

## Example

Submit 10, 20, and 30 in sequence. The running averages are 10, 15, and 20.

## License

MIT

Git hooks verified.

Git hooks verified.
