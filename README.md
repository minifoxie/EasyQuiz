# EasyQuiz ⚡

> **Assistente Inteligente de Auto-Resposta para Formulários e Quizzes com IA (100% Serverless)**  
> Sem dependência de servidor, sem hospedagens extras, com chave própria do Google Gemini e interface estritamente sólida.

[![Licença MIT](https://img.shields.io/badge/License-MIT-00e5ff?style=flat-square)](LICENSE)
[![Zero Servidor](https://img.shields.io/badge/Arquitetura-100%25%20Serverless-00ff9d?style=flat-square)](#)
[![Modelo Gemini](https://img.shields.io/badge/IA-Google%20Gemini%202.5%20Flash-00e5ff?style=flat-square)](#)

---

## ■ Destaques do Projeto

- **Zero Servidor (100% Client-Side)**: Não necessita de servidores Node.js, Vercel ou bancos de dados. Todo o processamento e as requisições para a IA ocorrem diretamente no navegador do usuário.
- **Chave de API Pessoal & Segura**: Cada usuário insere sua própria chave da API Gemini (obtida gratuitamente no [Google AI Studio](https://aistudio.google.com/app/apikey)). A chave é salva apenas no `localStorage` do seu navegador.
- **Design Industrial & Sólido**: Estética cyberpunk/high-tech com cantos rigorosamente retos (`border-radius: 0px`), sombras planas e **somente ícones SVG sólidos** (zero emojis).
- **Detecção Inteligente de Questões**: Algoritmo que detecta automaticamente a pergunta ativa em plataformas como **Google Forms**, **Moodle**, **Canvas**, **Blackboard**, **Kahoot**, **Quizizz** e formulários HTML5 padrão.
- **Destaques Geométricos na Tela**: A questão ativa é destacada em **ciano elétrico** e as opções escolhidas pela IA são realçadas em **verde neon** antes da confirmação.
- **Suporte a Imagens e Gráficos**: Compacta e analisa imagens e elementos `<canvas>` presentes na questão diretamente pelo navegador.
- **Atalho de Teclado**: Pressione `Alt + Q` a qualquer momento para abrir ou analisar a questão ativa.

---

## ■ Como Usar via Bookmarklet (Favoritos)

Você não precisa instalar nenhuma extensão. Basta adicionar um favorito no seu navegador:

1. Exiba a barra de favoritos do seu navegador (`Ctrl + Shift + B`).
2. Clique com o botão direito na barra de favoritos e selecione **Adicionar página** (ou **Novo favorito**).
3. No campo **Nome**, digite: `EasyQuiz`.
4. No campo **URL**, cole o código abaixo:

```javascript
javascript:(function(){if(window.__easyquiz){window.__easyquiz.toggle();return;}const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@main/dist/easyquiz.js?t='+Date.now();s.onerror=function(){const fb=document.createElement('script');fb.src='https://raw.githubusercontent.com/minifoxie/EasyQuiz/main/dist/easyquiz.js?t='+Date.now();document.head.appendChild(fb);};document.head.appendChild(s);})();
```

5. Salve o favorito!
6. Pronto! Em qualquer formulário ou quiz, basta clicar no favorito **EasyQuiz** para abrir o painel.

> **Dica**: Na primeira vez, insira sua chave gratuita da API Gemini (criada no [Google AI Studio](https://aistudio.google.com/app/apikey)) e clique em **Testar**. Ela fica salva automaticamente para usos futuros.

---

## ■ Como Usar via Userscript (Tampermonkey / Violentmonkey)

Se você utiliza gerenciadores de scripts de usuário como **Tampermonkey** ou **Violentmonkey**, você pode instalar o script diretamente:

- Arquivo: [`dist/easyquiz.user.js`](dist/easyquiz.user.js)

---

## ■ Recursos do Painel

- **Analisar Bloco da Questão**: Detecta a questão atual, envia o contexto para o Gemini e gera a justificativa e o plano de ação.
- **Aplicar Respostas na Página**: Marca os botões de opção/caixas de seleção, seleciona itens de listas ou digita a resposta em campos de texto.
- **Apenas Simular**: Permite ver a análise da IA e as respostas destacadas sem modificar nenhum campo na página.
- **Auto Aplicar**: Preenche as respostas instantaneamente após a resposta da IA.
- **Avançar Questão**: Se ativado e a confiança da IA for alta, clica automaticamente no botão de avançar para a próxima pergunta.
- **Seletor de Modelos**: Suporte nativo a `Gemini 2.5 Flash`, `Gemini 2.0 Flash`, `Gemini 1.5 Flash` e `Gemini 1.5 Pro`.

---

## ■ Estrutura do Código

```
EasyQuiz/
├── src/
│   ├── core/
│   │   ├── gemini.ts       # Chamadas diretas à API REST do Google Gemini
│   │   ├── prompt.ts       # Engenharia de prompt otimizada para provas e questões
│   │   ├── types.ts        # Tipagens TypeScript completas
│   │   └── storage.ts      # Gerenciamento de configurações em localStorage
│   ├── dom/
│   │   ├── detector.ts     # Algoritmo de pontuação e detecção de blocos de perguntas
│   │   ├── controls.ts     # Mapeamento de inputs, radios, checkboxes e selects
│   │   ├── highlighter.ts  # Realce visual sólido e quadrado na página
│   │   └── executor.ts     # Execução nativa de ações e disparo de eventos sintéticos
│   ├── media/
│   │   └── capture.ts      # Captura e compressão de imagens/canvas no navegador
│   ├── ui/
│   │   ├── icons.ts        # Ícones SVG 100% geométricos e sólidos (sem emojis)
│   │   ├── styles.ts       # Estilos cyberpunk, sombras sólidas e cantos 0px
│   │   └── panel.ts        # Painel Shadow DOM interativo
│   └── index.ts            # Ponto de entrada do script
├── scripts/
│   └── build.mjs           # Script de bundling com esbuild
├── dist/
│   ├── easyquiz.js         # Bundle standalone minificado
│   ├── easyquiz.user.js    # Versão Userscript (Tampermonkey)
│   └── bookmarklet.txt     # Código Bookmarklet pronto para copiar
├── package.json
└── tsconfig.json
```

---

## ■ Desenvolvimento e Compilação

Para compilar o projeto do zero:

```bash
# 1. Instalar dependências
npm install

# 2. Compilar o bundle
npm run build

# 3. Modo observador (watch) durante desenvolvimento
npm run watch
```

---

## ■ Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
