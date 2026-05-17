# Pense Bem

Aplicação web inspirada no clássico **Pense Bem**, com perguntas de física básica e sobre o universo Sonic.

O objetivo é ser uma releitura do Pense Bem para os tempos atuais: uma experiência digital que preserva a proposta de perguntas e respostas, mas permite jogar sem precisar ter o livro físico em mãos.

O projeto usa React no frontend e mantém a lógica principal do quiz em entidades de domínio, facilitando testes e evolução das regras sem acoplar tudo à interface.


# Imagem da aplicação
<img width="764" height="932" alt="image" src="https://github.com/user-attachments/assets/c3d976e8-6566-4a2a-a8e2-a73bc6e26dc2" />


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

