class ValidateCreateStoreError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidateCreateStoreError";
  }
}

module.exports = ValidateCreateStoreError;
