# Pense Bem Sonic Mobile

Aplicacao mobile em **React Native + Expo** inspirada no classico Pense Bem, com perguntas tematicas do Sonic, livros por codigo, imagens de apoio, pontuacao por tentativa e historico local no aparelho.

## Destaques

- App Expo com interface nativa para Android, iOS e preview web.
- Quiz dividido pelos livros `021` a `026`.
- 30 perguntas por livro, com pontuacao por tentativa.
- Livro especial `026` com perguntas aleatorias dos outros livros.
- Imagens de apoio em algumas questoes.
- Pontuacoes salvas localmente com AsyncStorage.
- Musica de fundo com Expo AV e feedback por vibracao.
- Easter egg com personagem secreto ao jogar todos os codigos.
- Regras de dominio preservadas e cobertas por Jest.

## Regras do Quiz

- Cada pergunta permite ate 3 tentativas.
- Acerto na primeira tentativa vale 3 pontos.
- Acerto na segunda tentativa vale 2 pontos.
- Acerto na terceira tentativa vale 1 ponto.
- Apos 3 erros, o jogo avanca sem pontuar.
- A pontuacao maxima por livro e 90 pontos.

## Como Rodar

Instale as dependencias:

```bash
npm install
```

Inicie o Expo:

```bash
npm start
```

Use o QR Code do Expo Go ou rode diretamente:

```bash
npm run android
npm run ios
npm run web
```

## Scripts

```bash
npm test       # executa os testes de dominio
npm run lint   # verifica o codigo
npx expo export --platform android  # valida o bundle mobile localmente
```

## Estrutura

```text
app.json        Configuracao Expo
index.js        Registro do app Expo
src/App.jsx     Interface mobile React Native
src/assets/     Imagens e audio do app
src/constants/  Constantes compartilhadas
src/data/       Perguntas usadas pela interface
src/domain/     Entidades e regras centrais do quiz
src/hooks/      Estado, audio e fluxo do jogo
src/services/   Livros, pontuacao e armazenamento
tests/          Testes automatizados
```
