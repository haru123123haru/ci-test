import request from "supertest";
import app from "./app.js";
import { describe, it, expect } from "vitest";

describe("API tests", () => {
  it("GET /hello returns message", async () => {
    const res = await request(app).get("/hello");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Hello" });
  });

  it("POST /user returns created user", async () => {
    const newUser = { name: "Alice", age: 25 };
    const res = await request(app).post("/user").send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      name: "Alice",
      age: 25,
    });
  });

  it("POST /user returns 400 if missing data", async () => {
    const res = await request(app).post("/user").send({ name: "Bob" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing name or age" });
  });

  //check authorized token
  it("GET /secret-token return 401 without token", async () => {
    const res = await request(app).get("/secure-token");
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: "Missing token" });
  });
  it("GET /secret-token return 403 with invalid token", async () => {
    const res = await request(app)
      .get("/secure-token")
      .set("Authorization", "Bearer wrongtoken");
    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual({ error: "Invalid token" });
  });
  it("GET /secret-token return secret with valid token", async () => {
    const res = await request(app)
      .get("/secure-token")
      .set("Authorization", "Bearer mysecrettoken");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ secret: "This is a protected resource" });
  });
});
