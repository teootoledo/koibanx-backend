const ERROR_HANDLERS = {
  ValidateCreateStoreError: (res, { message }) => res.status(400).send({ error: message }),

  ValidateGetStoreError: (res, { message }) => res.status(400).send({ error: message }),

  DomainError: (res, { message }) => res.status(409).send({ error: message }),

  AuthError: (res, { message }) => res.status(401).send({ error: message }),

  MongoError: (res) => res.status(500).send({ error: "invalid query" }),

  defaultError: (res, error) => {
    console.error(error.name);
    console.log(error.message);
    console.log(error.stack);
    res.status(500).send("Internal error");
  },
};

module.exports = (err, req, res, next) => {
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError;

  handler(res, err);
};
