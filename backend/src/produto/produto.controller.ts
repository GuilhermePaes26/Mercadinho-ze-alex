// src/produto/produto.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Product } from '@prisma/client';

@Controller('produtos') // Definindo o caminho da API para produtos
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  // Rota GET para buscar todos os produtos
  @Get()
  async findAll(): Promise<Product[]> {
    return this.produtoService.findAll(); // Chama o serviço para buscar todos os produtos
  }

  // Rota GET para buscar um produto pelo ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.produtoService.findOne(id); // Chama o serviço para buscar o produto pelo ID
  }

  // Rota POST para criar um novo produto
  @Post()
  async create(
    @Body() data: { name: string; price: number; stock: number },
  ): Promise<Product> {
    return this.produtoService.create(data); // Chama o serviço para criar o produto
  }

  // Rota PUT para atualizar um produto
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: { name: string; price: number; stock: number },
  ): Promise<Product> {
    return this.produtoService.update(id, data); // Chama o serviço para atualizar o produto
  }

  // Rota DELETE para deletar um produto
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Product> {
    return this.produtoService.delete(id); // Chama o serviço para deletar o produto
  }
}
