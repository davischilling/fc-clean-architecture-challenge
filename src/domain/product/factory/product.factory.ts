import { v4 as uuid } from "uuid";
import Product from "../entity/product";
import ProductB from "../entity/product-b";

export default class ProductFactory {
  public static createProduct(name: string, price: number): Product {
    return new Product(uuid(), name, price);
  }

  public static createProductB(name: string, price: number): ProductB {
    return new ProductB(uuid(), name, price);
  }

  public static create(
    type: "a" | "b",
    name: string,
    price: number
  ): Product | ProductB {
    if (type === "a") {
      return this.createProduct(name, price);
    }

    return this.createProductB(name, price);
  }
}
