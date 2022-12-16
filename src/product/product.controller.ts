import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dtos/createProduct.dto";
import {ClientProxy} from "@nestjs/microservices";

@Controller("products")
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
    ) {
  }

  @Get()
  async getAll() {
    this.client.emit("hello","hello from Rabbitmq");
    return this.productService.all();
  }

  @Post()
  async create(@Body() productCreateDto: CreateProductDto) {
    return this.productService.create(productCreateDto);
  }

  @Get("/:id")
  async get(@Param("id") id: number) {
    return this.productService.get(id);
  }

  @Put("/:id")
  async update(
    @Param("id") id: number,
    @Body() productCreateDto: CreateProductDto) {
    return this.productService.update(id,productCreateDto);
  }

  @Delete("/:id")
  async delete(
    @Param("id") id: number) {
    return this.productService.delete(id);
  }


}
