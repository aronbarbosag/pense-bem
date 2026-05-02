## Rodando com npm

Pré-requisitos:

- Node.js
- npm

Passo a passo:

```bash
npm install
```

```bash
npm run dev
```

Abra no navegador:

```text
http://localhost:5173
```

Comandos úteis:

```bash
npm test
```

```bash
npm run build
```

```bash
npm run preview
```

## Rodando com Docker

Pré-requisitos:

- Docker

Passo a passo usando os scripts do projeto:

```bash
npm run docker:build
```

```bash
npm run docker:run
```

Abra no navegador:

```text
http://localhost:8080
```

Para verificar se o container respondeu:

```bash
npm run docker:check
```

Para ver logs:

```bash
npm run docker:logs
```

Para parar o container:

```bash
npm run docker:stop
```

Também é possível rodar diretamente com Docker:

```bash
docker build -t pense-bem:test .
```

```bash
docker run -d --rm --name pense-bem-test -p 8080:80 pense-bem:test
```
