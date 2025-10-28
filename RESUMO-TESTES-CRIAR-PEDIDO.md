# 📋 TESTES DE CRIAÇÃO DE PEDIDO

## TESTE 11-26: CRIAÇÃO DE PEDIDO COMPLETO

### ✅ DADOS PARA O TESTE:

**RETIRADA (Pessoa Física):**
- CPF: 11144477735 (VÁLIDO)
- Nome: João Silva Santos
- Telefone: (11) 99887-6543
- Email: joao.silva@email.com
- CEP: 01310-100
- Endereço: Avenida Paulista
- Complemento: Salão 101
- Número: 1000
- Bairro: Bela Vista
- Cidade: São Paulo
- UF: SP

**OBJETO:**
- Nome: Documentos Importantes
- Modelo: Pasta A4
- Largura: 30 cm
- Altura: 40 cm
- Comprimento: 5 cm
- Peso: 2 kg
- Quantidade: 1

**DESTINO (Pessoa Física):**
- CPF: 11144477735
- Nome: Maria Santos Oliveira
- Telefone: (11) 98765-4321
- Email: maria.santos@email.com
- CEP: 04547-000
- Endereço: Avenida Brigadeiro Faria Lima
- Complemento: Sala 502
- Número: 200
- Bairro: Pinheiros
- Cidade: São Paulo
- UF: SP

---

## FLUXO DE TESTE:

1. ✅ Acessar /order/new
2. ⏳ Preencher RETIRADA
3. ⏳ Avançar para OBJETO
4. ⏳ Preencher OBJETO
5. ⏳ Avançar para DESTINO
6. ⏳ Preencher DESTINO
7. ⏳ Avançar para RESUMO
8. ⏳ Visualizar resumo e mapa
9. ⏳ Clicar SALVAR
10. ⏳ Verificar se apareceu na lista

---

## VALIDAÇÕES IMPORTANTES:

✅ CPF inválido deve ser rejeitado
✅ Campos obrigatórios devem ser validados
✅ Endereço completo deve ser aceito
✅ Mapa deve carregar no resumo
✅ Pedido deve salvar na API

