const request = require("supertest");
const app = require("../index");
const repository = require("../repository/itemRepository");
const { NotFoundError, ServerError } = require("../errors/error");
const { equals } = require("validator");
const { db } = require("../model/itemsModel");

jest.mock("../repository/itemRepository");

describe("GET /items", () => {
  it("should return list of all items", async () => {
    const dbtest = [{ item_name : "acamol" , unit_price : "10.50" , quantity : "100"}];
    repository.getItems.mockResolvedValue(dbtest);
    const response = await request(app).get("/items");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(dbtest);
  });
  it("return with a 404 Not Found list", async () => {
    repository.getItems.mockResolvedValue([]);
    const response = await request(app).get("/items");
    expect(response.statusCode).toBe(404);
  });
});

describe("GET /items/:item_name", () => {
  it("should return an item by name", async () => {
    const dbtest = [{ item_name : "acamol" , unit_price : "10.50" , quantity : "100"}];
    repository.getItemByItemName.mockResolvedValue(dbtest);
    const response = await request(app).get("/items/acamol");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(dbtest);
  });

  it("return with a 404 Not Found item ", async () => {
    repository.getItemByItemName.mockResolvedValue([]);
    const response = await request(app).get("/item/acamol");
    expect(response.statusCode).toBe(404);
  });

  it("should respond with a 400 Bad Request status code for invalid item names", async () => {
    const response = await request(app).get("/items/!@#$%^");
    expect(response.statusCode).toBe(400);
  });
});

describe("POST /items", () => {
  it("should add a new item ", async () => {
    const newItem = { item_name: "new_item", unit_price: 10, quantity: 20 };
    repository.addItem.mockResolvedValue(newItem);
    const response = await request(app).post("/items").send(newItem);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(newItem);
  });

  it("should respond with a 404 Bad Request status code if item data is incomplete", async () => {
    const response = await request(app)
      .post("/item")
      .send({ item_name: "incomplete_item" });
    expect(response.statusCode).toBe(404);
  });

  it("should respond with a 400 Bad Request status code if item data is invalid", async () => {
    const response = await request(app)
      .post("/item")
      .send({ item_name: "!@#$%^", unit_price: "invalid", quantity: -10 });
    expect(response.statusCode).toBe(400);
  });
});

describe("PUT /items/:item_name", () => {
  it("should update an existing item", async () => {
    const updatedItemData = { unit_price: 15 };
    repository.updateItem.mockResolvedValue(updatedItemData);
    const response = await request(app).put("/items/example_item").send(updatedItemData);
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
      .put("/item/non_existing_item")
      .send({ unit_price: 15 });
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /items/:item_name", () => {
  it("should delete an existing item and respond with a success message", async () => {
    const dbtest = [{ item_name : "acamol" , unit_price : "10.50" , quantity : "100"}];
    const response = await request(app).delete("/items/acamol");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Item has been deleted!");
  });

  it("should respond with a 404 Not Found status code for non-existing items", async () => {
    const response = await request(app).delete("/item/acamol");
    expect(response.statusCode).toBe(404);
  });

  it("should respond with a 400 Bad Request status code for invalid item names", async () => {
    const response = await request(app).delete("/items/!@#$%^");
    expect(response.statusCode).toBe(400);
  });
});
