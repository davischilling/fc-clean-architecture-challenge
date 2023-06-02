import { v4 as uuid } from "uuid";
import Product from "../entity/product";
import ProductB from "../entity/product-b";

export default class ProductFactory {
  public static create(
    type: "a" | "b",
    name: string,
    price: number
  ): Product | ProductB {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Invalid type");
    }
  }
}
