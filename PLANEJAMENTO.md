# Planejamento - Mini E-Commerce com Carrinho Dinâmico, Estoque e Gestor de Cupons

## Objetivo

Evoluir o carrinho de compras da aula para um mini PDV, adicionando novas funções **sem alterar a estrutura que já existe**, e persistir os dados no navegador via `localStorage`.

---

## 1. Progresso do Projeto (data: 10/09/2026)

### ✅ Já implementado

**Módulo 1 - Estoque**
- [x] `quantidadeEmEstoque` adicionado a cada produto do `estoque`.
- [x] Coluna "Estoque" na tabela renderiza o saldo em tempo real.
- [x] Validação de estoque antes de incluir ("Estoque insuficiente").
- [x] Baixa automática no estoque a cada inclusão no carrinho.
- [x] Busca dinâmica por nome/descrição (evento `input` + `filtrarEstoque`).

**Persistence - Estoque**
- [x] `salvarEstoque()` grava no `localStorage` (chave `estoque_pdv`).
- [x] `carregarEstoqueDoBanco()` restaura o estoque salvo ao abrir a página.

**Módulo 2 - Gestor de Cupons (Admin)**
- [x] Array `cupons` + padrão inicial (`DESCONTO20`, `MAMAE10`).
- [x] Persistência: `salvarCupons()` e `carregarCuponsDoBanco()` (chave `cupons_pdv`).
- [x] Formulário de cadastro (código + desconto).
- [x] Validações de cadastro: vazio, desconto fora de 1–100, duplicado.
- [x] Listagem dos cupons em tabela com `renderizarCupons()`.
- [x] Botão Excluir por cupom usando `filter`.

### ⏳ Falta fazer

**Módulo 3 - Carrinho Interativo (Passo 7, adiado)** — data: 17/09/2026
- [x] Coluna "Ações" na tabela do carrinho.
- [x] Botão **Remover** em cada linha (`removerDoCarrinho`).
- [x] Devolver a quantidade ao estoque ao remover.
- [x] Recalcular subtotais / re-renderizar na hora.
- [x] *(Opcional bonus)* `salvarCarrinho()` / `carregarCarrinhoDoBanco()`.

**Módulo 4 - Fechamento e Cupom**
- [x] Campo de checkout para digitar o cupom + botão **Aplicar Cupom**.
- [x] Validação do cupom (busca ignorando maiúsculas/minúsculas, erro amigável, 1 cupom por pedido).
- [x] Extrato financeiro em `finalizarCompra()`: Subtotal (`reduce`) + Cupom aplicado (código, % e R$ abatido) + Valor final.

**Finalização**
- [x] CSS: classe `.carrinho-vazio` no lugar dos `style=` inline.
- [ ] Testes finais (F5 mantém dados, fluxo completo, cupom inválido).
- [ ] Git/GitHub: commits em etapas e publicação (link final).

---

## 2. Estado Atual do Código

| Arquivo | O que temos hoje |
|---|---|
| `index.html` | Tabela de estoque (com coluna Estoque), busca, formulário adicionar, carrinho (com coluna Ações), gestor de cupons (form + tabela), caixa de Fechamento (cupom) e Finalizar Compra |
| `script.js` | `estoque`, `carrinho`, `cupons`, `cupomAplicado`; `filtrarEstoque`, `salvarEstoque`, `carregarEstoqueDoBanco`, `carregarEstoque`, `adicionarAoCarrinho`, `atualizarTabelaCarrinho`, `removerDoCarrinho`, `salvarCarrinho`, `carregarCarrinhoDoBanco`, `finalizarCompra`, `aplicarCupom`, `salvarCupons`, `carregarCuponsDoBanco`, `renderizarCupons`, `excluirCupom`, `cadastrarCupom` |
| `style.css` | Estilo limpo com classes `.form-box` e `.total-box` |

---

## 3. Princípios do Trabalho

- Adicionar funções novas **mantendo intactas** as funções atuais e a divisão em 3 arquivos.
- Funções reutilizáveis com nomes em português (`renderizarCupons`, etc.).
- Nomenclatura clara em português, validações de entrada.
- Sem estilos inline no HTML (ainda resta o `style=` do "Carrinho vazio").
- Código próprio, com nomes nossos (evitar cópias idênticas de outros grupos).

---

## 4. Estratégia de Persistência (localStorage)

| Dado | Chave | Status |
|---|---|---|
| Estoque | `estoque_pdv` | ✅ salvando/baixando |
| Cupons | `cupons_pdv` | ✅ salvando |
| Carrinho | `carrinho_pdv` | ✅ salvando/carregando |
| Pedidos (histórico) | `pedidos_pdv` | ⏳ pendente (ao finalizar) |

- Na abertura da página: carregar do `localStorage`; se não houver nada salvo, usar os valores iniciais.
- Usar `JSON.stringify` para salvar e `JSON.parse` para carregar.

---

## 5. Próximos Passos (ordem sugerida)

1. **Passo 7 - Carrinho interativo**: botão Remover + devolução de estoque.
2. **Checkout**: campo de cupom, validação e aplicação.
3. **Extrato financeiro**: Subtotal, cupom aplicado e valor final em `finalizarCompra()`.
4. **CSS** e limpeza de estilos inline.
5. **Testes finais**.
6. **Git/GitHub**: commits e publicação.

---

## 6. Decisões em Aberto

- **Estoque inicial** de cada produto já definido como 10 (pode ajustar depois).
- **Carrinho persistir** no F5: **decidido incluir** — implementado (`carrinho_pdv`).
- **Histórico de pedidos**: **decidido não gravar por enquanto** (`pedidos_pdv` fica para depois).

---

## 7. Entrega

- Projeto no GitHub (link final).
- Sem cópias idênticas de outros grupos (nomes próprios).