// backend/taskValidation.js

function isMissingTitle(input) {
  return !input || typeof input.title === "undefined" || input.title === "";
}

function isNonStringTitle(input) {
  return typeof input.title !== "string";
}

function validateTaskInput(input) {
  const errors = [];

  if (isMissingTitle(input)) {
    errors.push("Title is required");
  } else if (isNonStringTitle(input)) {
    errors.push("Title must be a string");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = { validateTaskInput };