import { IsInt, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  image: string;
}