const request = require("supertest");
const app = require("../index");

describe("GET /items", () => {
  it("should respond with JSON containing a list of all items", async () => {
    const response = await request(app).get("/items");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

describe("GET /items/:item_name", () => {
  it("should respond with JSON containing the item with the specified name", async () => {
    const response = await request(app).get("/items/example_item");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  it("should respond with a 404 Not Found status code for non-existing items", async () => {
    const response = await request(app).get("/items/non_existing_item");
    expect(response.statusCode).toBe(404);
  });

  it("should respond with a 400 Bad Request status code for invalid item names", async () => {
    const response = await request(app).get("/items/!@#$%^");
    expect(response.statusCode).toBe(400);
  });
});

describe("POST /items", () => {
  it("should add a new item and respond with JSON containing the added item", async () => {
    const newItem = { item_name: "new_item", unit_price: 10, quantity: 20 };
    const response = await request(app).post("/items").send(newItem);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(newItem));
  });

  it("should respond with a 400 Bad Request status code if item data is incomplete", async () => {
    const response = await request(app)
      .post("/items")
      .send({ item_name: "incomplete_item" });
    expect(response.statusCode).toBe(400);
  });

  it("should respond with a 400 Bad Request status code if item data is invalid", async () => {
    const response = await request(app)
      .post("/items")
      .send({ item_name: "!@#$%^", unit_price: "invalid", quantity: -10 });
    expect(response.statusCode).toBe(400);
  });
});

describe("PUT /items/:item_name", () => {
  it("should update an existing item and respond with JSON containing the updated item", async () => {
    const updatedItemData = { unit_price: 15 };
    const response = await request(app)
      .put("/items/example_item")
      .send(updatedItemData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(updatedItemData));
  });

  it("should respond with a 400 Bad Request status code if item data is invalid", async () => {
    const response = await request(app)
      .put("/items/example_item")
      .send({ unit_price: "invalid" });
    expect(response.statusCode).toBe(400);
  });

  it("should respond with a 404 Not Found status code for non-existing items", async () => {
    const response = await request(app)
      .put("/items/non_existing_item")
      .send({ unit_price: 15 });
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /items/:item_name", () => {
  it("should delete an existing item and respond with a success message", async () => {
    const response = await request(app).delete("/items/example_item");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Item has been deleted!");
  });

  it("should respond with a 404 Not Found status code for non-existing items", async () => {
    const response = await request(app).delete("/items/non_existing_item");
    expect(response.statusCode).toBe(404);
  });

  it("should respond with a 400 Bad Request status code for invalid item names", async () => {
    const response = await request(app).delete("/items/!@#$%^");
    expect(response.statusCode).toBe(400);
  });
});
