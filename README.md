# Pense Bem

Aplicação web inspirada no clássico **Pense Bem**, com perguntas do universo Sonic, interface interativa, pontuação por desempenho e organização da regra de jogo em uma camada de domínio.

O projeto usa React no frontend e mantém a lógica principal do quiz em entidades de domínio, facilitando testes e evolução das regras sem acoplar tudo à interface.

## Tecnologias

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Jest
- Docker
- Nginx

## Estrutura

```text
src/
  components/       Componentes visuais e telas da aplicação
  constants/        Constantes compartilhadas
  data/             Perguntas normalizadas para uso na interface
  domain/           Entidades e regras principais do quiz
  hooks/            Hooks de estado, áudio e fluxo do jogo
  services/         Serviços de pontuação, livros e armazenamento
  utils/            Funções utilitárias
tests/              Testes automatizados do domínio
```

## Rodando Localmente

Pré-requisitos:

- Node.js
- npm

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse a aplicação em:

```text
http://localhost:5173
```

## Qualidade

Execute os testes:

```bash
npm test
```

Gere uma build de produção:

```bash
npm run build
```

Pré-visualize a build localmente:

```bash
npm run preview
```

Execute o lint:

```bash
npm run lint
```

## Utilizando Docker

Crie a imagem:

```bash
docker build --no-cache -t pense-bem:test .
```

Suba o container:

```bash
docker run -d --rm --name pense-bem-test -p 8080:80 pense-bem:test
```

Liste o container em execução:

```bash
docker ps --filter name=pense-bem-test
```

Veja os logs:

```bash
docker logs pense-bem-test --tail 20
```

Pare o container:

```bash
docker stop pense-bem-test
```

## Regras do Quiz

- Cada livro possui um conjunto de perguntas.
- A pontuação varia conforme a quantidade de tentativas na pergunta.
- Após três erros, o jogo avança para a próxima pergunta.
- O melhor resultado de cada livro é salvo no navegador.

## Build de Produção

O Dockerfile usa build em múltiplos estágios:

- `node:24.13-alpine` para instalar dependências e gerar os arquivos estáticos.
- `nginx:1.29-alpine` para servir o conteúdo final da pasta `dist`.
