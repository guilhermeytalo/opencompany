# Open Company

Projeto para listar, criar e editar, empresas usando a API fornecida.

## :wrench: Tecnologias utilizadas

O projeto foi feito com [Angular CLI](https://angular.dev/), [Bootstrap](https://ng-bootstrap.github.io/#/home) e [Json Server](https://www.npmjs.com/package/json-server).


## :scroll: Development server

Para startar o projeto assumindo que a sua máquina já esteja com npm e o angular configurado `npm start` e ele usará a porta `http://localhost:4200/` e para utilizar a api apenas rodar `npm run mock` e ele usara a porta `http://localhost:3000`.

## :heavy_check_mark: Todos
- [x] Home
	- [x] Usar a API para listar as empresas
	- [x] Exibir os dados da empresa ao lado da listagem.
- [x] Criar nova Solicitação
- [x] Ao clicar em `vizualizar` um item da lista, o usuário deve ver os detalhes que exibe informações detalhadas da empresa.
- [x] Ao clicar em `editar` um item da lista, o usuário deve ser direcionado para a tela com os detalhes que exibe informações da empresa e conseguir edita-las.
- [x] Padronização e espaçamento nos campos do formulário.
- [x] Criar testes unitários para a service e app principal.
- [x] Criar aplicação em deploy no Netlify*.


## :rocket: Deploy
Você pode acessar a aplicação clicando [aqui](https://voxtest.netlify.app/)*


## :bulb: Melhorias
- Algumas máscaras e validações para campos específicos
- Loading para alguns casos
- Responsividade

## Atenção
Para o caso do deploy deve se estar rodando `npm run mock` para funcionar corretamente caso acesse pelo deploy