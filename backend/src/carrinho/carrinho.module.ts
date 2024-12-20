import { Module } from '@nestjs/common';
import { CarrinhoController } from './carrinho.controller';
import { ProdutoModule } from 'src/produto/produto.module';

@Module({
  imports: [ProdutoModule],
  controllers: [CarrinhoController],
})
export class CarrinhoModule {}
