const moongose = require("mongoose");
const { seed } = require("../utils/initializer");

const { server } = require("../app");
const StoreSchema = require("../models/store");
const { api, invalidStore, validStore } = require("./helper");

jest.setTimeout(30000);

beforeEach(async () => {
  await StoreSchema.deleteMany({});

  await seed();
});

describe("BasicAuth", () => {
  test("without auth should throw a AuthError", async () => {
    await api.get('/api/stores?q={"page": 2, "limit": 5}').expect(401);
  });

  test("with auth should not throw a AuthError", async () => {
    await api
      .get('/api/stores?q={"page": 2, "limit": 5}')
      .auth("test@koibanx.com", "test123")
      .expect(200);
  });

  test("with incorrect password should throw a AuthError", async () => {
    await api
      .get('/api/stores?q={"page": 2, "limit": 5}')
      .auth("test@koibanx.com", "test123No")
      .expect(401);
  });
});

describe("Get all stores", () => {
  test("should return 10 pages", async () => {
    const res = await api
      .get('/api/stores?q={"page": 5, "limit": 2}')
      .auth("test@koibanx.com", "test123")
      .expect(200);
    expect(res.body.pages).toBe(10);
  });
  test("should return 20 documents", async () => {
    const res = await api
      .get('/api/stores?q={"page": 5, "limit": 2}')
      .auth("test@koibanx.com", "test123")
      .expect(200);
    expect(res.body.total).toBe(20);
  });
});

describe("Post a store", () => {
  test("with invalid params should throw a ValidationError", async () => {
    await api
      .post("/api/stores")
      .send(invalidStore)
      .auth("test@koibanx.com", "test123")
      .expect(400);
  });
  test("with valid params should not throw a ValidationError", async () => {
    await api
      .post("/api/stores")
      .send(validStore)
      .auth("test@koibanx.com", "test123")
      .expect(200);
  });
});

afterAll(() => {
  moongose.connection.close();
  server.close();
});
