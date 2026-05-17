// backend/taskValidation.js

function validateTaskInput(input) {
  const errors = [];

  if (!input || typeof input.title === "undefined" || input.title === "") {
    errors.push("Title is required");
  } else if (typeof input.title !== "string") {
    errors.push("Title must be a string");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = { validateTaskInput };