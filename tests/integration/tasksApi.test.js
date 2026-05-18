// tests/integration/tasksApi.test.js

const request = require("supertest");
const app = require("../../backend/app");

describe("Tasks API integration tests", () => {
  test("POST /tasks creates a new task and returns 201", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Finish CMSC 129 Lab 4" });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      title: "Finish CMSC 129 Lab 4",
      completed: false,
    });
  });

  test("GET /tasks returns the list of tasks", async () => {
    await request(app)
      .post("/tasks")
      .send({ title: "Review integration testing" });

    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Review integration testing",
          completed: false,
        }),
      ]),
    );
  });

  test("POST /tasks returns 400 when title is empty", async () => {
    const response = await request(app).post("/tasks").send({ title: "" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toContain("Title is required");
  });
});