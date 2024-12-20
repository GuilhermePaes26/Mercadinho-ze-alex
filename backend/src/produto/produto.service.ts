/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client'; // Importando o tipo Product
import { CarrinhoDto } from 'src/carrinho/dto/carrinho.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  // Buscar todos os produtos
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany(); // Usando o Prisma para buscar todos os produtos
  }

  // Buscar um produto pelo ID
  async findOne(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id: +id },
    });
  }

  // Criar um novo produto
  async create(data: {
    name: string;
    price: number;
    stock: number;
  }): Promise<Product> {
    return this.prisma.product.create({
      data, // Passa os dados para o Prisma criar o produto
    });
  }

  // Atualizar um produto
  async update(
    id: number,
    data: { name: string; price: number; stock: number },
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id: +id }, // Busca o produto pelo ID
      data, // Atualiza os dados do produto
    });
  }

  // Deletar um produto
  async delete(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id: +id }, // Deleta o produto pelo ID
    });
  }

  async updateStockAfterCart(data: CarrinhoDto[]): Promise<void> {
    for (const item of data) {
      const product = await this.findOne(item.productId);

      if (product.stock < item.quantity) {
        throw new Error('Estoque insuficiente');
      }

      await this.prisma.product.update({
        where: { id: item.productId },
        data: { stock: product.stock - item.quantity },
      });
    }
  }

  // Função para calcular o total do carrinho
  async calculateCartTotal(data: CarrinhoDto[]): Promise<number> {
    let total = 0;

    for (const item of data) {
      const product = await this.findOne(item.productId);
      total += product.price * item.quantity;
    }

    return total;
  }
}
