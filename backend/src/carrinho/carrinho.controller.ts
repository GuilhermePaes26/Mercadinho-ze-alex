import { Controller, Post, Body } from "@nestjs/common";
import { ProdutoService } from "../produto/produto.service";
import { CarrinhoDto } from "./dto/carrinho.dto";

@Controller("carrinho")
export class CarrinhoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post("adicionar")
  async addToCart(@Body() data: CarrinhoDto[]): Promise<string> {
    try {
      await this.produtoService.updateStockAfterCart(data);

      const total = await this.produtoService.calculateCartTotal(data);

      return `Carrinho atualizado! Total: R$ ${total.toFixed(2)}`;
    } catch (error) {
      throw new Error("Erro ao atualizar carrinho: " + error.message);
    }
  }
}
