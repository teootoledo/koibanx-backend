const ValidateCreateStoreError = require("../errors/ValidateCreateStoreError");

const validateCreateStore = (req, res, next) => {
  try {
    const body = req.body;
    validateName(body.name);
    validateCuit(body.cuit);
    validateConcepts(body.concepts);
    validateCurrentBalance(body.currentBalance);
    validateActive(body.active);
    validateLastSale(body.lastSale);
    next();
  } catch (err) {
    next(err);
  }
};

const validateName = (name) => {
  const regexName = /^[a-zA-Z-0-9 ]+$/;

  if (!name) {
    throw new ValidateCreateStoreError("name is required");
  } else if (!regexName.test(name))
    throw new ValidateCreateStoreError(
      "name only can contain letters, numbers and spaces"
    );
};

const validateCuit = (cuit) => {
  const regexCuit = /^[0-9]{11}$/;

  if (!cuit) {
    throw new ValidateCreateStoreError("cuit is required");
  } else if (!regexCuit.test(cuit))
    throw new ValidateCreateStoreError("cuit must have 11 digits");
};

const validateConcepts = (concepts) => {
  if (!concepts) throw new ValidateCreateStoreError("concepts is required");
  if (!Array.isArray(concepts))
    throw new ValidateCreateStoreError("concepts must be an array");
  if (concepts.length != 6)
    throw new ValidateCreateStoreError("concepts must have six elements");
  if (!validateNumbersOfConcepts(concepts))
    throw new ValidateCreateStoreError(
      "the concepts must be numbered from 1 to 6"
    );
  if (!validateValueOfConcepts(concepts))
    throw new ValidateCreateStoreError(
      "the value of concepts must be a number"
    );
};

const validateValueOfConcepts = (concept) => {
  return concept.every((concept) => {
    return typeof concept.value == "number";
  });
};

const validateNumbersOfConcepts = (concepts) => {
  let numbersOfConcept = concepts.map((concept) => concept.number);
  var validNumbersOfConcept = [];
  for (let i = 1; i < 7; i++) {
    validNumbersOfConcept.push(i);
  }

  return validNumbersOfConcept.every((number) => {
    return numbersOfConcept.includes(number);
  });
};

const validateCurrentBalance = (currentBalance) => {
  if (!currentBalance) {
    throw new ValidateCreateStoreError("currentBalance is required");
  } else if (!(typeof currentBalance === "number"))
    throw new ValidateCreateStoreError("currentBalance must be a number");
};

const validateActive = (active) => {
  if (!active) {
    throw new ValidateCreateStoreError("active is required");
  } else if (!(typeof active === "boolean")) {
    throw new ValidateCreateStoreError("active must be true or false");
  }
};

const validateLastSale = (date) => {
  if (!date) {
    throw new ValidateCreateStoreError("lastSale is required");
  }

  const receivedDate = new Date(date);

  if (!(receivedDate instanceof Date && !isNaN(receivedDate))) {
    throw new ValidateCreateStoreError("lastSale must be a valid date");
  }
};

module.exports = {
  validateCreateStore,
  validateName,
  validateCuit,
  validateConcepts,
  validateCurrentBalance,
  validateActive,
  validateLastSale,
};
