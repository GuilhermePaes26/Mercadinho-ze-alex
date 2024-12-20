// src/produto/produto.module.ts
import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CarrinhoController } from '../carrinho/carrinho.controller';

@Module({
  controllers: [ProdutoController, CarrinhoController],
  providers: [ProdutoService, PrismaService],
  exports: [ProdutoService],
})
export class ProdutoModule {}
