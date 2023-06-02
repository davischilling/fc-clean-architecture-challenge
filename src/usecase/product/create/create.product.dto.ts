export interface InputCreateProductDto {
  type: "a" | "b";
  name: string;
  price: number;
}

export interface OutputCreateProductDto {
  id: string;
  name: string;
  price: number;
}
