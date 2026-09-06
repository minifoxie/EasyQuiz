# EasyQuiz ⚡

> **Assistente Inteligente de Auto-Resposta para Formulários e Quizzes com IA (100% Serverless)**  
> Sem dependência de servidor, sem hospedagens extras, com chave própria do Google Gemini e interface estritamente sólida.

[![Licença MIT](https://img.shields.io/badge/License-MIT-00e5ff?style=flat-square)](LICENSE)
[![Zero Servidor](https://img.shields.io/badge/Arquitetura-100%25%20Serverless-00ff9d?style=flat-square)](#)
[![Modelo Gemini](https://img.shields.io/badge/IA-Google%20Gemini%203.8%20Flash-7aa2f7?style=flat-square)](#)

---

## ■ Destaques do Projeto

- **Zero Servidor (100% Client-Side)**: Não necessita de servidores Node.js, Vercel ou bancos de dados. Todo o processamento e as requisições para a IA ocorrem diretamente no navegador do usuário.
- **Chave de API pessoal**: Cada usuário insere sua própria chave da API Gemini (obtida no [Google AI Studio](https://aistudio.google.com/app/apikey)). A chave fica no navegador; `localStorage` não deve ser tratado como cofre em máquinas compartilhadas.
- **Design discreto**: Painel escuro, compacto e orientado a estados de análise, aplicação e verificação, sem estética neon.
- **Detecção Inteligente de Questões**: Algoritmo que detecta automaticamente a pergunta ativa em plataformas como **Google Forms**, **Moodle**, **Canvas**, **Blackboard**, **Kahoot**, **Quizizz** e formulários HTML5 padrão.
- **Destaques Geométricos na Tela**: A questão ativa é destacada em **ciano elétrico** e as opções escolhidas pela IA são realçadas em **verde neon** antes da confirmação.
- **Suporte a Imagens e Gráficos**: Compacta e analisa imagens e elementos visuais presentes na questão quando o contexto DOM não é suficiente.
- **Atalho de Teclado**: Pressione `Alt + Q` a qualquer momento para abrir ou analisar a questão ativa.

---

## ■ Como Usar via Bookmarklet (Favoritos)

Você não precisa instalar nenhuma extensão. Basta adicionar um favorito no seu navegador:

1. Exiba a barra de favoritos do seu navegador (`Ctrl + Shift + B`).
2. Clique com o botão direito na barra de favoritos e selecione **Adicionar página** (ou **Novo favorito**).
3. No campo **Nome**, digite: `EasyQuiz`.
4. No campo **URL**, cole o código abaixo:

```javascript
javascript:(function(){document.head.appendChild(document.createElement('script')).src='https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@main/dist/easyquiz.js'})();
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
- **Seletor de Modelos**: Descobre modelos autorizados pela chave em runtime, priorizando modelos estáveis atuais como `gemini-3.8-flash`, `gemini-3.5-flash-lite` e `gemini-2.5-flash`.

> O EasyQuiz valida o plano da IA antes de executar, confirma respostas no DOM e bloqueia o avanço quando a aplicação é parcial. A compatibilidade genérica não substitui testes no site específico.

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

# 4. Verificação de tipos
npm run typecheck

# 5. Smoke tests do executor
npm run test:smoke

# 6. Invariantes de segurança e política de execução
npm run test:security
```

---

## ■ Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
