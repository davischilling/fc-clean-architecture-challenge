import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const input: InputCreateProductDto = {
  type: "a",
  name: "product name",
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    const { name, ...inputRest } = input;

    await expect(
      productCreateUseCase.execute({ name: "", ...inputRest })
    ).rejects.toThrow("Name is required");
  });

  it("should thrown an error when price is invalid", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    const { price, ...inputRest } = input;

    await expect(
      productCreateUseCase.execute({ price: 0, ...inputRest })
    ).rejects.toThrow("Product: Price must be greater than 0");
  });
});
