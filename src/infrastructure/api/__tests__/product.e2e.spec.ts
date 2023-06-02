import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
      name: "Product Name",
      price: 10,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product Name");
    expect(response.body.price).toBe(10);
  });

  it("should not create a product if type is missing", async () => {
    const response = await request(app).post("/product").send({
      name: "Product Name",
      price: 20,
    });
    expect(response.status).toBe(400);
  });

  it("should not create a product if type is invalid", async () => {
    const response = await request(app).post("/product").send({
      type: "c",
      name: "Product Name",
      price: 20,
    });
    expect(response.status).toBe(400);
  });

  it("should not create a product if name is empty", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
      price: 20,
    });
    expect(response.status).toBe(400);
  });

  it("should not create a product if price is invalid", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
      name: "Product Name",
      price: 0,
    });
    expect(response.status).toBe(400);
  });

  it("should list all product", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
      name: "Product Name",
      price: 10,
    });
    expect(response.status).toBe(201);
    const response2 = await request(app).post("/product").send({
      type: "a",
      name: "Product 2 Name",
      price: 20,
    });
    expect(response2.status).toBe(201);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product Name");
    expect(product.price).toBe(10);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product 2 Name");
    expect(product2.price).toBe(20);

    const listResponseXML = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product Name</name>`);
    expect(listResponseXML.text).toContain(`<price>10</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product 2 Name</name>`);
    expect(listResponseXML.text).toContain(`<price>20</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});
