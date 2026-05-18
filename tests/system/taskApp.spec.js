// tests/system/taskApp.spec.js

const { test, expect } = require("@playwright/test");

test.describe("Task Manager user stories", () => {
  test("User Story 1: student can add a task and see it in the task list", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("task-title-input").fill("Finish CMSC 129 Lab 4");
    await page.getByTestId("add-task-button").click();

    await expect(page.getByTestId("task-list")).toContainText(
      "Finish CMSC 129 Lab 4",
    );
  });

  test("User Story 2: student can edit an existing task and see the updated title", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("task-title-input").fill("Old task title");
    await page.getByTestId("add-task-button").click();

    await page.getByTestId("edit-task-button-1").click();
    await page.getByTestId("edit-task-input-1").fill("Updated task title");
    await page.getByTestId("save-task-button-1").click();

    await expect(page.getByTestId("task-list")).toContainText(
      "Updated task title",
    );
    await expect(page.getByTestId("task-list")).not.toContainText(
      "Old task title",
    );
  });

  test("User Story 3: student can delete a task and confirm it is removed from the task list", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("task-title-input").fill("Task to delete");
    await page.getByTestId("add-task-button").click();

    await expect(page.getByTestId("task-list")).toContainText("Task to delete");

    await page.getByTestId("delete-task-button-1").click();

    await expect(page.getByTestId("task-list")).not.toContainText(
      "Task to delete",
    );
  });
});