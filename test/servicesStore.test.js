const DomainError = require("../utils/errors/DomainError");
const ValidateCreateStoreError = require("../utils/errors/ValidateCreateStoreError");

const { storeFormatter } = require("../utils/formatter");

const {
  validateCreateStore,
  validateName,
  validateCuit,
  validateConcepts,
  validateCurrentBalance,
  validateActive,
  validateLastSale,
} = require("../utils/middlewares/validateCreateStore");

const storeForStoreFormatter = {
  _id: "62065dc1aa06000f11afffff",
  name: "Esperanza Roman",
  active: true,
  currentBalance: 1483,
  cuit: 12984867004,
  lastSale: "2015-03-17T20:48:24.257+00:00",
  concepts: [
    {
      number: 2,
      value: 54,
    },
    {
      number: 1,
      value: 41,
    },
    {
      number: 3,
      value: 10,
    },
    {
      number: 5,
      value: 78,
    },
    {
      number: 6,
      value: 98,
    },
    {
      number: 4,
      value: 3,
    },
  ],
};

describe("storeFormatter", () => {
  test("of a store must be the same store with lastSale, active, currentBalance formatted", () => {
    expect(storeFormatter(storeForStoreFormatter)).toStrictEqual({
      id: "62065dc1aa06000f11afffff",
      name: "Esperanza Roman",
      active: "Si",
      currentBalance: "$1,483.00",
      cuit: 12984867004,
      lastSale: "2015/03/17",
      concepts: [
        {
          number: 1,
          value: 41,
        },
        {
          number: 2,
          value: 54,
        },

        {
          number: 3,
          value: 10,
        },
        {
          number: 4,
          value: 3,
        },
        {
          number: 5,
          value: 78,
        },
        {
          number: 6,
          value: 98,
        },
      ],
    });
  });
});

describe("validateCreateStore", () => {
  test("of 2015/04/30 should not throw a ValidateCreateStoreError", () => {
    expect(() => validateLastSale("2015/04/30")).not.toThrow(
      ValidateCreateStoreError
    );
  });
  test("of 2015/04/32 should throw a ValidateCreateStoreError", () => {
    expect(() => validateLastSale("2015/04/32")).toThrow(
      ValidateCreateStoreError
    );
  });
  test("of 2015-04-32 should throw a ValidateCreateStoreError", () => {
    expect(() => validateLastSale("2015-04-32")).toThrow(
      ValidateCreateStoreError
    );
  });
  test("of undefined should throw a ValidateCreateStoreError", () => {
    expect(() => validateLastSale()).toThrow(ValidateCreateStoreError);
  });
});

describe("validateCurrentBalance", () => {
  test("of 1000 should not throw a ValidateCreateStoreError", () => {
    expect(() => validateCurrentBalance(1000)).not.toThrow(
      ValidateCreateStoreError
    );
  });
  test("of undefined should not throw a ValidateCreateStoreError", () => {
    expect(() => validateCurrentBalance()).toThrow(ValidateCreateStoreError);
  });
  test("of string should not throw a ValidateCreateStoreError", () => {
    expect(() => validateCurrentBalance("1000")).toThrow(
      ValidateCreateStoreError
    );
  });
});

describe("validateActive", () => {
  test("of true should not throw a ValidateCreateStoreError", () => {
    expect(() => validateActive(true)).not.toThrow(ValidateCreateStoreError);
  });
  test("of a string should throw a ValidateCreateStoreError", () => {
    expect(() => validateActive("true")).toThrow(ValidateCreateStoreError);
  });
  test("of undefined should throw a ValidateCreateStoreError", () => {
    expect(() => validateActive()).toThrow(ValidateCreateStoreError);
  });
});

describe("validateName", () => {
  test("of valid name should not throw a ValidateCreateStoreError", () => {
    expect(() => validateName("Monica Lopez 84")).not.toThrow(
      ValidateCreateStoreError
    );
  });
  test("of invalid name should throw a ValidateCreateStoreError", () => {
    expect(() => validateName("Monica lopez 84 $")).toThrow(
      ValidateCreateStoreError
    );
  });

  test("of undefined should throw a ValidateCreateStoreError", () => {
    expect(() => validateName()).toThrow(ValidateCreateStoreError);
  });
});

describe("validateConcepts", () => {
  test("of valid concepts should not throw a ValidateCreateStoreError", () => {
    expect(() =>
      validateConcepts([
        {
          number: 2,
          value: 54,
        },
        {
          number: 1,
          value: 41,
        },
        {
          number: 3,
          value: 10,
        },
        {
          number: 5,
          value: 78,
        },
        {
          number: 6,
          value: 98,
        },
        {
          number: 4,
          value: 3,
        },
      ])
    ).not.toThrow(ValidateCreateStoreError);
  });
  test("of invalid concepts should throw a ValidateCreateStoreError", () => {
    expect(() => validateConcepts([])).toThrow(ValidateCreateStoreError);
  });
});

describe("validateCuil", () => {
  test("of a cuil with 11 digits should not throw a Validarion Error", () => {
    expect(() => validateCuit("20423533049")).not.toThrow(
      ValidateCreateStoreError
    );
  });
  test("of a cuil with 12 digits should throw a Validarion Error", () => {
    expect(() => validateCuit("204235330499")).toThrow(
      ValidateCreateStoreError
    );
  });
  test("of undefined should throw a Validarion Error", () => {
    expect(() => validateCuit("204235330499")).toThrow(
      ValidateCreateStoreError
    );
  });
  test("of a cuil with invalid characters should throw a Validarion Error", () => {
    expect(() => validateCuit("20423533!499")).toThrow(
      ValidateCreateStoreError
    );
  });
});
