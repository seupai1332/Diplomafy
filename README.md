# Diplomafy

Sistema de gerenciamento de certificados e diplomas digitais.

## Funcionalidades

- Gerenciamento de templates de certificados
- Emissão de certificados
- Suporte offline (PWA)
- Sistema de cache
- Monitoramento de performance
- Testes automatizados

## Tecnologias

- React
- TypeScript
- Tailwind CSS
- Supabase
- Vitest
- Cypress
- Storybook

## Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/diplomafy.git
cd diplomafy
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## Scripts

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run test` - Executa testes unitários
- `npm run test:e2e` - Executa testes end-to-end
- `npm run storybook` - Inicia o Storybook
- `npm run lint` - Executa linter
- `npm run format` - Formata código

## Estrutura do Projeto

```
diplomafy/
├── src/
│   ├── components/
│   │   └── common/
│   ├── hooks/
│   ├── utils/
│   ├── tests/
│   │   └── hooks/
│   └── stories/
├── cypress/
│   └── e2e/
├── public/
└── .storybook/
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 