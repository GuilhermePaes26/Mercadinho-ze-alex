import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { CarrinhoModule } from './carrinho/carrinho.module';

@Module({
  imports: [ProdutoModule, CarrinhoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
