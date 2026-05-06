# Raízes do Nordeste

Projeto desenvolvido para a atividade prática de **Projeto Multidisciplinar — Trilha Front-End**, do curso de Análise e Desenvolvimento de Sistemas.

## Sobre o projeto

O projeto simula uma aplicação front-end multicanal para a rede fictícia **Raízes do Nordeste**, uma rede de lanchonetes em expansão.

A solução contempla três canais principais:

- **App Cliente:** fluxo mobile para escolha de unidade, cardápio, carrinho, identificação, LGPD, pagamento simulado e acompanhamento do pedido.
- **Totem de Autoatendimento:** fluxo presencial simplificado para pedidos rápidos em loja.
- **Painel Web/Admin:** ambiente interno simulado para acompanhamento e atualização de status dos pedidos.

## Tecnologias utilizadas

- React
- Vite
- TypeScript
- React Router DOM
- CSS Modules
- Mock Data

## Funcionalidades

- Seleção de canal de atendimento;
- Seleção de unidade;
- Cardápio dinâmico por unidade;
- Filtro por categoria de produtos;
- Carrinho com alteração de quantidade e remoção de itens;
- Cupom promocional simulado;
- Identificação do cliente ou continuação como visitante;
- Consentimento LGPD antes do pagamento;
- Política de privacidade;
- Pagamento externo simulado com retorno aprovado ou recusado;
- Confirmação do pedido;
- Acompanhamento do status;
- Totem de autoatendimento;
- Painel interno com filtros e atualização de status;
- Simulação de perfis internos no painel admin.

## Escopo acadêmico

Este projeto é um protótipo acadêmico com foco em front-end.

A aplicação **não realiza pagamento real**, **não possui banco de dados real** e **não possui autenticação real**. Os dados são mockados e utilizados apenas para demonstrar os fluxos da interface.

O painel `/admin` representa um ambiente interno simulado. Em uma aplicação real, essa área seria protegida por login e permissões de acesso por perfil.
