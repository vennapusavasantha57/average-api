const { test, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { app, resetAverage } = require("../src/server.js");

beforeEach(() => {
  resetAverage();
});

test("first number returns itself as the average", async () => {
  const response = await request(app)
    .post("/average")
    .send({ number: 10 });

  assert.equal(response.status, 200);
  assert.equal(response.body.average, 10);
  assert.equal(response.body.count, 1);
});

test("calculates the average of multiple numbers", async () => {
  await request(app).post("/average").send({ number: 10 });

  const response = await request(app)
    .post("/average")
    .send({ number: 20 });

  assert.equal(response.status, 200);
  assert.equal(response.body.average, 15);
  assert.equal(response.body.count, 2);
});

test("accepts a raw numeric JSON body", async () => {
  const response = await request(app)
    .post("/average")
    .set("Content-Type", "application/json")
    .send("12");

  assert.equal(response.status, 200);
  assert.equal(response.body.average, 12);
  assert.equal(response.body.count, 1);
});

test("handles decimal numbers and zero", async () => {
  await request(app).post("/average").send({ number: 0 });

  const response = await request(app)
    .post("/average")
    .send({ number: 2.5 });

  assert.equal(response.status, 200);
  assert.equal(response.body.average, 1.25);
  assert.equal(response.body.count, 2);
});

test("rejects invalid input", async () => {
  const response = await request(app)
    .post("/average")
    .send({ number: "hello" });

  assert.equal(response.status, 400);
});

test("rejects a missing number", async () => {
  const response = await request(app)
    .post("/average")
    .send({});

  assert.equal(response.status, 400);
});

test("invalid input does not affect the running average", async () => {
  await request(app).post("/average").send({ number: 10 });

  const invalidResponse = await request(app)
    .post("/average")
    .send({ number: "hello" });

  assert.equal(invalidResponse.status, 400);

  const response = await request(app)
    .post("/average")
    .send({ number: 20 });

  assert.equal(response.body.average, 15);
  assert.equal(response.body.count, 2);
});

test("returns 400 for malformed JSON", async () => {
  const response = await request(app)
    .post("/average")
    .set("Content-Type", "application/json")
    .send('{"number":');

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Invalid JSON.");
});