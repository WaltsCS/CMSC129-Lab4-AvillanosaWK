// tests/unit/taskValidation.test.js

const { validateTaskInput } = require("../../backend/taskValidation");

describe("validateTaskInput()", () => {
  test("accepts a task with a valid title", () => {
    const result = validateTaskInput({ title: "Finish CMSC 129 Lab 4" });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test("rejects a task with an empty title", () => {
    const result = validateTaskInput({ title: "" });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Title is required");
  });

  test("rejects a task with a missing title", () => {
    const result = validateTaskInput({});

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Title is required");
  });

  test("rejects a task with a non-string title", () => {
    const result = validateTaskInput({ title: 123 });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Title must be a string");
  });
});
