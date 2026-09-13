<div align="center">
  <img src="dist/Canvas.png" alt="EasyQuiz Canvas Logo" width="200" />
  <h1>EasyQuiz ⚡</h1>
  <p><b>Assistente Inteligente de Auto-Resposta para Quizzes com IA (100% Serverless)</b></p>

  [![Licença MIT](https://img.shields.io/badge/License-MIT-00e5ff?style=flat-square)](#)
  [![Zero Servidor](https://img.shields.io/badge/Arquitetura-100%25%20Serverless-00ff9d?style=flat-square)](#)
  [![Suporte](https://img.shields.io/badge/Navegadores-Chromium_Only-blue?style=flat-square)](#)

  *Código aberto. Pareado, projetado e desenvolvido utilizando as IAs mais avançadas da atualidade.*  
  <br>
  <img src="https://img.shields.io/badge/Gemini_3.1_Pro-1A73E8?style=flat-square&logo=googlebard&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Claude_Sonnet_4.6-D97757?style=flat-square&logo=anthropic&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Antigravity_IDE-000000?style=flat-square&logo=google&logoColor=white" />
</div>

---

## 📑 Tabela de Conteúdos
- [O que é o EasyQuiz?](#-o-que-é-o-easyquiz)
- [Navegadores Suportados](#-navegadores-suportados)
- [Como Funciona (Mecânicas e Lógica)](#-como-funciona-mecânicas-e-lógica)
- [Modos de Operação e Comandos](#-modos-de-operação-e-comandos)
  - [Modo Legacy (Painel Flutuante)](#1-modo-legacy-painel-flutuante)
  - [Modo Discreto (Stealth)](#2-modo-discreto-stealth)
- [Instalação e Bookmarklets (Códigos Recentes)](#-instalação-e-bookmarklets-códigos-recentes)
- [Como obter sua Chave da API](#-como-obter-sua-chave-da-api)
- [Plataformas Compatíveis](#-plataformas-compatíveis)

---

## 💡 O que é o EasyQuiz?
O **EasyQuiz** é uma ferramenta de injeção direta (Bookmarklet script) que acopla uma Inteligência Artificial nativamente no seu navegador. Ele lê, compreende, localiza e preenche as respostas corretas de quizzes e formulários estudantis de forma totalmente autônoma. 

Sem depender de servidores ou de mensalidades. O processamento é **100% Client-Side** via requisições diretas à API REST do Google Gemini.

---

## 🌐 Navegadores Suportados
O EasyQuiz faz uso massivo das APIs modernas de Shadow DOM, Eye-Dropping e Image Capture, sendo compatível e testado **estritamente em navegadores baseados no motor Chromium**.

| <img src="https://img.shields.io/badge/Google_Chrome-4285F4?style=flat-square&logo=googlechrome&logoColor=white" /> | <img src="https://img.shields.io/badge/Microsoft_Edge-0078D7?style=flat-square&logo=microsoftedge&logoColor=white" /> | <img src="https://img.shields.io/badge/Brave-FF2000?style=flat-square&logo=brave&logoColor=white" /> | <img src="https://img.shields.io/badge/Opera-FF1B2D?style=flat-square&logo=opera&logoColor=white" /> |
| :---: | :---: | :---: | :---: |
| Suporte Total | Suporte Total | Suporte Total | Suporte Total |

> **Nota:** Não há suporte planejado para Mozilla Firefox ou Safari.

---

## ⚙️ Como Funciona (Mecânicas e Lógica)
O sistema opera através de **três pilares lógicos**:
1. **Rastreamento Automático**: Ao invés de você selecionar a questão, o EasyQuiz varre a árvore do site e pontua todos os elementos (baseado em classes, estrutura de inputs e labels). Aquele com a maior pontuação é classificado como a "Questão Ativa".
2. **Contexto Visual e Textual**: Se a questão possuir imagens, tabelas ou SVGs complexos, o EasyQuiz tira "prints" vetoriais em tempo real, comprime e envia para a IA ter o contexto perfeito (Visão Computacional).
3. **Injeção de Eventos (Event Dispatcher)**: Quando a IA responde, o sistema não altera o HTML bruto (o que seria facilmente detectável e quebraria sites modernos). Ele simula cliques físicos (`PointerEvents`), digitação caractere por caractere (simulando teclado físico humano), e dispatch de eventos do React/Angular/Vue para que a página valide sua resposta naturalmente.

---

## 🎮 Modos de Operação e Comandos

O EasyQuiz possui duas variantes, dependendo da sua necessidade de interface:

### 1. Modo Legacy (Painel Flutuante)
Apresenta um painel visual flutuante completo, robusto e cyberpunk (estilo VS Code). 
Ideal para debugar a IA, gerenciar configurações facilmente e visualizar logs e miniaturas.
- **`Alt + Q`** — Abre/Fecha o painel principal e automaticamente analisa a questão focada.
- Possui Abas para: *Resolver, Cérebro (Contexto), Mídias (Fotos capturadas), Cronômetro, Terminal e Configurações*.

### 2. Modo Discreto (Stealth)
Opera 100% invisível em background. Não existe painel fixo ou janelas óbvias, apenas minúsculas notificações no canto da tela (Toasts) e uma injeção automatizada baseada em atalhos.
- **`Alt + Q`** ou **`Shift + Q`** — Dispara a análise da questão atual silenciosamente.
- **`Shift + V`** — Abre o popup de Mídias (para visualizar o que a IA está enxergando).
- **`Shift + H`** — Abre o DevTools Flutuante (Terminal de fluxo, auditoria e debug).
- **`Shift + M`** — Cicla entre os modelos de IA disponíveis em tempo real.
- **`Shift + A`** — Abre o menu para adicionar/trocar sua Chave de API de forma furtiva.
- **`Shift + C`** — Abre o menu de comandos rápidos (Ativar Autopilot, Auto-Avançar, etc).
- **`Shift + Z`** — Aborta/Cancela a análise ou fluxo atual de injeção imediatamente.
- **`Shift + R`** — Re-analisa a mesma questão (útil se a internet piscou ou algo falhou).

---

## 🚀 Instalação e Bookmarklets (Códigos Recentes)
O **Bookmarklet script** é um código de uma linha que você salva como "Favorito" no seu navegador. Clicar nesse favorito "injeta" o EasyQuiz na página que você está.

### Passo a Passo de Instalação:
1. Deixe a barra de favoritos visível no seu navegador (Geralmente `Ctrl + Shift + B`).
2. Clique com o botão direito na barra e vá em **Adicionar página** ou **Novo favorito**.
3. No campo **Nome**, digite `EasyQuiz` (ou `EasyQuiz Discreto`).
4. No campo **URL**, copie e cole UM dos blocos de código abaixo (o código todo).
5. Salve. Em qualquer prova ou formulário, clique no favorito que você criou para iniciar!

> **Dica**: Use o botão de copiar no canto direito superior das caixas de código abaixo.

#### Código para o Modo Legacy (Painel Completo)
```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@main/dist/easyquiz.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{if(window.__easyquiz&&typeof window.__easyquiz.destroy==='function'){window.__easyquiz.destroy()}var h=document.getElementById('easyquiz-shadow-root');if(h)h.remove();(0,eval)(c)}catch(e){alert('EasyQuiz erro: '+e)}}).catch(function(e){alert('EasyQuiz falha no download: '+e)})})();
```

#### Código para o Modo Discreto (Invisível)
```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@main/dist/discrete.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{if(window.__eqdiscrete&&typeof window.__eqdiscrete.destroy==='function'){window.__eqdiscrete.destroy()}(0,eval)(c)}catch(e){alert('EasyQuiz Discreto erro: '+e)}}).catch(function(e){alert('EasyQuiz Discreto falha no download: '+e)})})();
```

---

## 🔑 Como obter sua Chave da API
Para o sistema funcionar sem mensalidades, ele roda diretamente pela sua chave do Google Gemini.
1. Acesse o [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Faça login com sua conta Google (é 100% gratuito).
3. Clique em **"Create API Key"**.
4. Copie a chave (começa com `AIzaSy...`).
5. Ao executar o EasyQuiz pela primeira vez via Bookmarklet, clique na engrenagem de configurações (ou use `Shift + A` no Modo Discreto) e cole sua chave.
6. A chave fica salva no `localStorage` do seu navegador (seu computador). Não usamos servidores!

---

## 🏫 Plataformas Compatíveis
O EasyQuiz usa um algoritmo genérico de detecção semântica que permite funcionar em quase tudo, mas possui tratamentos especiais (Framework Injection) para lidar com os bloqueios de segurança das seguintes plataformas:

* **Google Forms** (Apoio total)
* **Canvas Instructure** (Apoio total)
* **Moodle** (Apoio total)
* **Blackboard** (Apoio total)
* **Kahoot! / Quizizz / Blooket** (Suporte parcial e experimental)
* Qualquer site que utilize `<input type="radio">`, `<input type="checkbox">`, `<select>` ou formulários HTML5 padrão.

> **Importante:** Apesar do suporte robusto, sempre revise a resposta fornecida pela IA antes de enviar o formulário definitivo. A precisão do sistema é pautada pelos limites dos Modelos Gemini da Google.
