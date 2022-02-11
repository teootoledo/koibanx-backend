class ValidateGetStoresError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidateGetStoresError";
  }
}

module.exports = ValidateGetStoresError;
